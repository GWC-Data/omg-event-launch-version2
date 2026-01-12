import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import video1 from "@/assets/video1.mp4";
import {
  User,
  Phone,
  MapPin,
  Package,
  Clock,
  ChevronDownIcon,
  Sun,
  Moon,
  Loader2,
  Info,
  Asterisk,
  ExternalLink,
  Users,
  ArrowLeft,
  Gem,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import {
  rudrakshaBookingSchema,
  RudrakshaBookingValues,
} from "@/schemas/rudraksha-booking-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationErrorMessage from "@/components/ui/validation-error-message";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// TypeScript declarations for Google Maps API
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement | HTMLTextAreaElement,
            options?: {
              types?: string[];
              componentRestrictions?: { country: string };
            }
          ) => {
            addListener: (event: string, callback: () => void) => void;
            getPlace: () => {
              formatted_address?: string;
              place_id?: string;
              address_components?: Array<{
                long_name: string;
                short_name: string;
                types: string[];
              }>;
              geometry?: {
                location: {
                  lat: () => number;
                  lng: () => number;
                };
              };
            };
          };
        };
        event: {
          clearInstanceListeners: (instance: unknown) => void;
        };
      };
    };
  }
}

// Time slots configuration
const TIME_SLOTS = [
  {
    start: "06:00:00",
    end: "08:00:00",
    label: "Early Morning",
    icon: Sun,
    period: "Morning",
  },
  {
    start: "08:00:00",
    end: "10:00:00",
    label: "Morning",
    icon: Sun,
    period: "Morning",
  },
  {
    start: "10:00:00",
    end: "12:00:00",
    label: "Late Morning",
    icon: Sun,
    period: "Morning",
  },
  {
    start: "12:00:00",
    end: "14:00:00",
    label: "Afternoon",
    icon: Sun,
    period: "Afternoon",
  },
  {
    start: "14:00:00",
    end: "16:00:00",
    label: "Afternoon",
    icon: Sun,
    period: "Afternoon",
  },
  {
    start: "16:00:00",
    end: "18:00:00",
    label: "Evening",
    icon: Sun,
    period: "Evening",
  },
  {
    start: "18:00:00",
    end: "20:00:00",
    label: "Evening",
    icon: Moon,
    period: "Evening",
  },
  {
    start: "20:00:00",
    end: "22:00:00",
    label: "Night",
    icon: Moon,
    period: "Night",
  },
  {
    start: "22:00:00",
    end: "06:00:00",
    label: "Midnight",
    icon: Moon,
    period: "Midnight",
    fullWidth: true,
  },
] as const;

interface RudrakshaDetailsStepProps {
  phoneNumber: string;
  onSubmit: (data: RudrakshaBookingValues) => Promise<void>;
  onBack: () => void;
  onClose: () => void;
  isLoading?: boolean;
  initialFullName?: string;
  initialAddressText?: string;
}

const RudrakshaDetailsStep = ({
  phoneNumber,
  onSubmit,
  onBack,
  onClose,
  isLoading = false,
  initialFullName,
  initialAddressText,
}: RudrakshaDetailsStepProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date | undefined>(undefined);
  const [numberOfPeople, setNumberOfPeople] = useState<string>("1");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Get today's date at start of day for date restriction
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<RudrakshaBookingValues>({
    resolver: zodResolver(rudrakshaBookingSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: phoneNumber,
      addressText: initialAddressText || "",
      addressPlaceId: undefined,
      addressLat: undefined,
      addressLng: undefined,
      addressLine1: initialAddressText || "",
      addressLine2: "",
      city: "",
      district: "",
      state: "",
      pinCode: "",
      age: undefined,
      gender: "",
      participatingInEvent: false,
      preferredDate: [],
      preferredTimeSlot: {},
      members: [],
      rudrakshaQuantity: 1,
    },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const participatingInEvent = watch("participatingInEvent");
  const rudrakshaQuantity = watch("rudrakshaQuantity");

  // Ref for Google Places Autocomplete on Address Line 1
  const addressLine1InputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autocompleteRef = useRef<any>(null);
  const isAutocompleteSetting = useRef(false);
  const lastAutocompleteValue = useRef<string>("");

  // Helper function to get address component value
  const getAddressComponent = (
    components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>,
    type: string
  ): string => {
    const component = components.find((comp) => comp.types.includes(type));
    return component ? component.long_name : "";
  };

  // Initialize Google Places Autocomplete on Address Line 1
  useEffect(() => {
    if (addressLine1InputRef.current && !autocompleteRef.current) {
      const initAutocomplete = () => {
        if (
          window.google &&
          window.google.maps &&
          window.google.maps.places &&
          addressLine1InputRef.current
        ) {
          try {
            const autocomplete = new window.google.maps.places.Autocomplete(
              addressLine1InputRef.current,
              {
                types: ["geocode", "establishment"],
                componentRestrictions: { country: "in" },
              }
            );

            autocomplete.addListener("place_changed", () => {
              const place = autocomplete.getPlace();

              if (
                place.address_components &&
                place.address_components.length > 0
              ) {
                isAutocompleteSetting.current = true;
                const components = place.address_components;
                const formattedAddress = place.formatted_address || "";

                // Extract address components
                const streetNumber = getAddressComponent(
                  components,
                  "street_number"
                );
                const route = getAddressComponent(components, "route");
                const subpremise = getAddressComponent(
                  components,
                  "subpremise"
                );
                const locality = getAddressComponent(components, "locality");
                const administrativeAreaLevel1 = getAddressComponent(
                  components,
                  "administrative_area_level_1"
                );
                const administrativeAreaLevel2 = getAddressComponent(
                  components,
                  "administrative_area_level_2"
                );
                const postalCode = getAddressComponent(
                  components,
                  "postal_code"
                );

                // Build address line 1 (street number + route)
                const addressLine1 = `${streetNumber} ${route}`.trim();

                // Set form values
                setValue("addressLine1", addressLine1, {
                  shouldValidate: true,
                });
                setValue("addressLine2", subpremise, { shouldValidate: false });
                setValue("city", locality, { shouldValidate: true });
                setValue("state", administrativeAreaLevel1, {
                  shouldValidate: true,
                });
                setValue("district", administrativeAreaLevel2, {
                  shouldValidate: false,
                });
                setValue("pinCode", postalCode, { shouldValidate: true });

                // Set place ID and coordinates if available
                if (place.place_id) {
                  setValue("addressPlaceId", place.place_id);
                }
                if (place.geometry && place.geometry.location) {
                  const lat = place.geometry.location.lat();
                  const lng = place.geometry.location.lng();
                  setValue("addressLat", lat);
                  setValue("addressLng", lng);
                }

                // Store the addressLine1 value for comparison
                lastAutocompleteValue.current = addressLine1;

                setTimeout(() => {
                  isAutocompleteSetting.current = false;
                }, 100);
              }
            });

            autocompleteRef.current = autocomplete;
          } catch (error) {
            console.error(
              "Error initializing Google Places Autocomplete:",
              error
            );
          }
        }
      };

      initAutocomplete();

      // If Google Maps API is not loaded yet, wait for it
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        const checkInterval = setInterval(() => {
          if (
            window.google &&
            window.google.maps &&
            window.google.maps.places
          ) {
            clearInterval(checkInterval);
            initAutocomplete();
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkInterval);
        }, 10000);
      }
    }

    // Cleanup
    return () => {
      if (autocompleteRef.current) {
        try {
          window.google?.maps?.event?.clearInstanceListeners(
            autocompleteRef.current
          );
        } catch (error) {
          console.error("Error cleaning up autocomplete:", error);
        }
        autocompleteRef.current = null;
      }
    };
  }, [setValue]);

  // Handle manual typing - clear place data if user types manually
  const handleAddressLine1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // If user is typing manually (not from autocomplete), clear place data
    if (
      !isAutocompleteSetting.current &&
      value !== lastAutocompleteValue.current
    ) {
      setValue("addressPlaceId", undefined);
      setValue("addressLat", undefined);
      setValue("addressLng", undefined);
    }
  };

  const handleNumberOfPeopleChange = (value: string) => {
    setNumberOfPeople(value);
  };

  const onFormSubmit = async (data: RudrakshaBookingValues) => {
    // Combine address fields into addressText
    const addressParts = [
      data.addressLine1,
      data.addressLine2,
      data.city,
      data.district,
      data.state,
      data.pinCode,
    ].filter((part) => part && part.trim() !== "");

    const combinedAddress =
      addressParts.length > 0 ? addressParts.join(", ") : "";

    // Set the combined address
    if (combinedAddress && combinedAddress.trim() !== "") {
      data.addressText = combinedAddress;
    }

    await onSubmit(data);
  };

  // Sync members array with numberOfPeople selection (only when participating in event)
  useEffect(() => {
    if (!participatingInEvent) {
      // If not participating, reset numberOfPeople and clear members
      setNumberOfPeople("1");
      while (fields.length > 0) {
        remove(0);
      }
      return;
    }

    const targetCount = parseInt(numberOfPeople, 10) - 1; // Subtract 1 because primary user is separate
    const currentCount = fields.length;

    if (targetCount > currentCount) {
      // Add missing members
      const membersToAdd = targetCount - currentCount;
      for (let i = 0; i < membersToAdd; i++) {
        append({
          idName: "",
          idAge: undefined,
          idGender: "",
        });
      }
    } else if (targetCount < currentCount) {
      // Remove excess members
      const membersToRemove = currentCount - targetCount;
      for (let i = 0; i < membersToRemove; i++) {
        remove(currentCount - 1 - i);
      }
    }
  }, [numberOfPeople, participatingInEvent, fields.length, append, remove]);

  // When initial values from /users/me are available, prefill the form fields.
  useEffect(() => {
    const updates: Partial<RudrakshaBookingValues> = {};

    if (initialFullName) {
      updates.fullName = initialFullName;
    }

    if (initialAddressText) {
      updates.addressText = initialAddressText;
      updates.addressLine1 = initialAddressText;
    }

    if (Object.keys(updates).length > 0) {
      reset((prev) => ({
        ...prev,
        ...updates,
        phoneNumber,
      }));
    }
  }, [initialFullName, initialAddressText, phoneNumber, reset]);

  // Set phone number when component mounts or phoneNumber prop changes
  useEffect(() => {
    if (phoneNumber) {
      setValue("phoneNumber", phoneNumber, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      trigger("phoneNumber");
    }
  }, [phoneNumber, setValue, trigger]);

  return (
    <div className="flex flex-1 flex-col md:flex-row overflow-hidden w-full h-[100dvh] md:h-full relative">
      {/* Left side - Video background */}
      <div className="hidden md:block relative w-full md:w-1/2 h-full overflow-hidden">
        <div className="absolute inset-0">
          <video
            src={video1}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 md:bg-gradient-to-r md:from-black/85 md:via-black/50 md:to-black/30" />
        </div>

        {/* Buttons and text on top of video */}
        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background border border-gold/30 hover:border-gold transition-all shadow-sm hover:shadow-md w-fit"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gold" />
          </button>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/30 md:to-transparent rounded-lg -m-4 md:-m-6" />
            <div className="relative p-4 md:p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Blessed Rudraksha
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-gold mb-3 leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Complete Your
                <span className="block text-3xl md:text-4xl text-white mt-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                  Booking Details
                </span>
              </h3>
              <p className="text-sm md:text-base text-white font-medium max-w-sm leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                Provide your details to secure your blessed Rudraksha and
                optionally participate in the divine Maha Yagam event.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full md:w-1/2 flex-col flex-1 min-h-0 md:h-full bg-card-gradient/95 backdrop-blur-sm md:border-l md:border-gold/20 relative">
        {/* Back button - top left corner (mobile only) */}
        <button
          onClick={onBack}
          className="md:hidden absolute top-4 left-4 z-50 p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background border border-gold/30 hover:border-gold text-muted-foreground hover:text-foreground transition-all shadow-sm hover:shadow-md"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gold" />
        </button>

        {/* Close button - top right corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background border border-gold/30 hover:border-gold text-muted-foreground hover:text-foreground transition-all shadow-sm hover:shadow-md"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col flex-1 min-h-0 overflow-hidden"
        >
          {/* Fixed Header */}
          <div className="flex-shrink-0 px-6 pt-6 pb-4 text-center border-b border-gold/20">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/90 backdrop-blur-sm border border-gold/30 px-3 py-1 mb-4">
              <Gem className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm">
                Pre-Book Blessed Rudraksha
              </span>
            </div>

            {/* Sub-header */}
            <h3 className="font-display text-xl font-bold text-gold">
              Booking Details
            </h3>
          </div>

          {/* Scrollable Form Fields */}
          <ScrollArea className="flex-1 px-6">
            <div className="space-y-4 py-4 pr-4">
              {/* Row 1: Full Name | Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-gold" />
                    <span className="flex items-center gap-1">
                      Full Name
                      <Asterisk className="w-3 h-3 text-red-500" />
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex items-center"
                        >
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p>
                          Enter your full legal name as it appears on your ID
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    placeholder="Enter your name"
                    {...register("fullName")}
                    className={cn(
                      "bg-input border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground",
                      errors.fullName ? "border-red-500" : ""
                    )}
                  />
                  <div className="min-h-[20px]">
                    {errors.fullName && (
                      <ValidationErrorMessage
                        message={errors.fullName.message}
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gold" />
                    <span className="flex items-center gap-1">
                      Phone Number
                      <Asterisk className="w-3 h-3 text-red-500" />
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex items-center"
                        >
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p>Phone number verified from OTP step</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    {...register("phoneNumber")}
                    disabled
                    className={cn(
                      "bg-input border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground disabled:opacity-100 disabled:cursor-default",
                      errors.phoneNumber ? "border-red-500" : ""
                    )}
                  />
                  <div className="min-h-[20px]">
                    {errors.phoneNumber && (
                      <ValidationErrorMessage
                        message={errors.phoneNumber.message}
                      />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Phone number from verification step
                  </p>
                </div>
              </div>

              {/* Row 2: Age | Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-gold" />
                    <span className="flex items-center gap-1">
                      Age
                      <span className="text-xs text-muted-foreground">
                        (optional)
                      </span>
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex items-center"
                        >
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p>Enter your age in years (optional)</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    {...register("age", { valueAsNumber: true })}
                    min={1}
                    max={150}
                    className={cn(
                      "bg-input border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground",
                      errors.age ? "border-red-500" : ""
                    )}
                  />
                  <div className="min-h-[20px]">
                    {errors.age && (
                      <ValidationErrorMessage message={errors.age.message} />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-gold" />
                    <span className="flex items-center gap-1">
                      Gender
                      <Asterisk className="w-3 h-3 text-red-500" />
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex items-center"
                        >
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p>Select your gender</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <div className="pt-2">
                    <RadioGroup
                      value={watch("gender")}
                      onValueChange={(value) => setValue("gender", value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="male"
                          id="gender-male"
                          className="border-gold"
                        />
                        <Label
                          htmlFor="gender-male"
                          className="cursor-pointer text-foreground"
                        >
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="female"
                          id="gender-female"
                          className="border-gold"
                        />
                        <Label
                          htmlFor="gender-female"
                          className="cursor-pointer text-foreground"
                        >
                          Female
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="others"
                          id="gender-others"
                          className="border-gold"
                        />
                        <Label
                          htmlFor="gender-others"
                          className="cursor-pointer text-foreground"
                        >
                          Others
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="min-h-[20px]">
                    {errors.gender && (
                      <ValidationErrorMessage message={errors.gender.message} />
                    )}
                  </div>
                </div>
              </div>

              {/* Address Fields (3 columns per row) */}
              <div className="space-y-4">
                <Label className="text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="flex items-center gap-1">
                    Delivery Address
                    <Asterisk className="w-3 h-3 text-red-500" />
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex items-center"
                      >
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs">
                      <p>
                        Enter complete delivery address. Google Maps suggestions
                        are available in Address Line 1
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </Label>

                {/* Row 1: Address Line 1, Address Line 2, City */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="addressLine1"
                      className="text-sm text-foreground"
                    >
                      Address Line 1
                    </Label>
                    <Input
                      id="addressLine1"
                      placeholder="Street address, P.O. box (Google Maps suggestions available)"
                      {...register("addressLine1")}
                      ref={(e) => {
                        const { ref } = register("addressLine1");
                        ref(e);
                        addressLine1InputRef.current = e;
                      }}
                      onChange={(e) => {
                        register("addressLine1").onChange(e);
                        handleAddressLine1Change(e);
                      }}
                      className={cn(
                        "bg-input border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground placeholder:text-muted-foreground",
                        errors.addressLine1
                          ? "border-red-500"
                          : "border-gold/30"
                      )}
                    />
                    <div className="min-h-[20px]">
                      {errors.addressLine1 && (
                        <ValidationErrorMessage
                          message={errors.addressLine1.message}
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="addressLine2"
                      className="text-sm text-foreground"
                    >
                      Address Line 2
                    </Label>
                    <Input
                      id="addressLine2"
                      placeholder="Apartment, suite, unit, building"
                      {...register("addressLine2")}
                      className={cn(
                        "bg-input border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground placeholder:text-muted-foreground",
                        errors.addressLine2
                          ? "border-red-500"
                          : "border-gold/30"
                      )}
                    />
                    <div className="min-h-[20px]">
                      {errors.addressLine2 && (
                        <ValidationErrorMessage
                          message={errors.addressLine2.message}
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm text-foreground">
                      City
                    </Label>
                    <Input
                      id="city"
                      placeholder="City"
                      {...register("city")}
                      className={cn(
                        "bg-input border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground placeholder:text-muted-foreground",
                        errors.city ? "border-red-500" : "border-gold/30"
                      )}
                    />
                    <div className="min-h-[20px]">
                      {errors.city && (
                        <ValidationErrorMessage message={errors.city.message} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 2: District, State, Pin Code */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="district"
                      className="text-sm text-foreground"
                    >
                      District
                    </Label>
                    <Input
                      id="district"
                      placeholder="District"
                      {...register("district")}
                      className={cn(
                        "bg-input border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground placeholder:text-muted-foreground",
                        errors.district ? "border-red-500" : "border-gold/30"
                      )}
                    />
                    <div className="min-h-[20px]">
                      {errors.district && (
                        <ValidationErrorMessage
                          message={errors.district.message}
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm text-foreground">
                      State
                    </Label>
                    <Input
                      id="state"
                      placeholder="State"
                      {...register("state")}
                      className={cn(
                        "bg-input border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground placeholder:text-muted-foreground",
                        errors.state ? "border-red-500" : "border-gold/30"
                      )}
                    />
                    <div className="min-h-[20px]">
                      {errors.state && (
                        <ValidationErrorMessage
                          message={errors.state.message}
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="pinCode"
                      className="text-sm text-foreground"
                    >
                      Pin Code
                    </Label>
                    <Input
                      id="pinCode"
                      type="text"
                      placeholder="PIN Code"
                      {...register("pinCode")}
                      className={cn(
                        "bg-input border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground placeholder:text-muted-foreground",
                        errors.pinCode ? "border-red-500" : "border-gold/30"
                      )}
                      maxLength={6}
                    />
                    <div className="min-h-[20px]">
                      {errors.pinCode && (
                        <ValidationErrorMessage
                          message={errors.pinCode.message}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="min-h-[20px]">
                  {errors.addressText && (
                    <ValidationErrorMessage
                      message={errors.addressText.message}
                    />
                  )}
                </div>
              </div>

              {/* Participating in Event Checkbox */}
              <div className="flex items-center space-x-2 p-4 bg-secondary/50 rounded-lg border border-gold/20">
                <Checkbox
                  id="participating"
                  checked={participatingInEvent}
                  onCheckedChange={(checked) => {
                    setValue("participatingInEvent", checked as boolean);
                    if (!checked) {
                      setValue("preferredDate", []);
                      setValue("preferredTimeSlot", {});
                      setViewDate(undefined);
                      setNumberOfPeople("1");
                      while (fields.length > 0) {
                        remove(0);
                      }
                    }
                  }}
                />
                <Label
                  htmlFor="participating"
                  className="text-foreground font-medium cursor-pointer"
                >
                  Participating in Maha Yagam 2026 / Maha Shiv Ratri event
                </Label>
              </div>
              {/* Conditional Fields for Event Participation */}
              {participatingInEvent && (
                <>
                  {/* notification for carry the aadhar card */}
                  <div className="p-4 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/30 dark:border-blue-400/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          Important: Please carry your ID card with you for
                          verification.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Preferred Date and Time */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="date-picker"
                        className="text-foreground flex items-center gap-2"
                      >
                        <Clock className="w-4 h-4 text-gold" />
                        <span className="flex items-center gap-1">
                          Choose a date for your visit
                          <Asterisk className="w-3 h-3 text-red-500" />
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="inline-flex items-center"
                            >
                              <Info className="w-3 h-3 text-muted-foreground" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="text-xs">
                            <p>
                              Select your preferred dates to attend the Maha
                              Yagam event
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="flex flex-col gap-3">
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              id="date-picker"
                              className="w-full h-11 justify-between font-normal text-base"
                            >
                              {watch("preferredDate") &&
                                watch("preferredDate")!.length > 0
                                ? `${watch("preferredDate")!.length
                                } date(s) selected`
                                : "Select dates"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="multiple"
                              selected={
                                watch("preferredDate")
                                  ? watch("preferredDate")!.map(
                                    (d) => new Date(d)
                                  )
                                  : []
                              }
                              captionLayout="dropdown"
                              disabled={{ before: today }}
                              onSelect={(dates, selectedDay) => {
                                let formattedDates: string[] = [];
                                if (dates) {
                                  formattedDates = dates.map((d) => {
                                    const year = d.getFullYear();
                                    const month = String(
                                      d.getMonth() + 1
                                    ).padStart(2, "0");
                                    const day = String(d.getDate()).padStart(
                                      2,
                                      "0"
                                    );
                                    return `${year}-${month}-${day}`;
                                  });
                                }

                                setValue("preferredDate", formattedDates);

                                // Clean up slots for deselected dates
                                const currentSlots =
                                  getValues("preferredTimeSlot") || {};
                                const newSlots = { ...currentSlots };
                                Object.keys(newSlots).forEach((key) => {
                                  if (!formattedDates.includes(key)) {
                                    delete newSlots[key];
                                  }
                                });
                                setValue("preferredTimeSlot", newSlots);

                                // Update viewDate logic
                                const isSelected = dates?.some(
                                  (d) => d.getTime() === selectedDay.getTime()
                                );

                                if (isSelected) {
                                  setViewDate(selectedDay);
                                } else if (
                                  viewDate &&
                                  viewDate.getTime() === selectedDay.getTime()
                                ) {
                                  setViewDate(undefined);
                                }
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <div className="min-h-[20px]">
                          {errors.preferredDate && (
                            <ValidationErrorMessage
                              message={errors.preferredDate.message}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="time-picker"
                        className="text-foreground flex items-center gap-2"
                      >
                        <Clock className="w-4 h-4 text-gold" />
                        <span className="flex items-center gap-1">
                          Choose time slots
                          <Asterisk className="w-3 h-3 text-red-500" />
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="inline-flex items-center"
                            >
                              <Info className="w-3 h-3 text-muted-foreground" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="text-xs">
                            <p>Select time slots for each selected date</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>

                      {watch("preferredDate")!.length === 0 ? (
                        <div className="items-center justify-center p-8 text-muted-foreground text-sm border border-dashed border-gold/20 rounded-lg flex flex-col gap-2 bg-input/20">
                          <Clock className="w-8 h-8 opacity-50" />
                          <p>
                            Please select a date first to view available time
                            slots
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Selected Dates Badges */}
                          <div className="flex flex-col gap-2">
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                              Selected Dates
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {watch("preferredDate")!.map((dateStr) => {
                                const isSelected =
                                  viewDate &&
                                  (() => {
                                    const year = viewDate.getFullYear();
                                    const month = String(
                                      viewDate.getMonth() + 1
                                    ).padStart(2, "0");
                                    const day = String(
                                      viewDate.getDate()
                                    ).padStart(2, "0");
                                    return `${year}-${month}-${day}`;
                                  })() === dateStr;

                                // Count slots for this date
                                const slots =
                                  watch("preferredTimeSlot")?.[dateStr];
                                const slotCount = Array.isArray(slots)
                                  ? slots.length
                                  : slots
                                    ? 1
                                    : 0;

                                return (
                                  <Badge
                                    key={dateStr}
                                    variant={isSelected ? "default" : "outline"}
                                    className={cn(
                                      "cursor-pointer hover:bg-gold/20",
                                      isSelected
                                        ? "bg-gold text-black hover:bg-gold/80"
                                        : "border-gold/50 text-foreground"
                                    )}
                                    onClick={() =>
                                      setViewDate(new Date(dateStr))
                                    }
                                  >
                                    {dateStr}
                                    {slotCount > 0 && (
                                      <span className="ml-1.5 rounded-full bg-background/20 px-1 text-[10px]">
                                        {slotCount}
                                      </span>
                                    )}
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>

                          {viewDate ? (
                            <div className="animate-in fade-in duration-300">
                              <div className="flex items-center justify-between mb-3 text-[11px] sm:text-xs text-muted-foreground">
                                <span>
                                  Time slots for:{" "}
                                  <span className="font-medium text-foreground">
                                    {viewDate.toLocaleDateString()}
                                  </span>
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                {TIME_SLOTS.map((slot) => {
                                  const Icon = slot.icon;
                                  const dateKey = (() => {
                                    const year = viewDate.getFullYear();
                                    const month = String(
                                      viewDate.getMonth() + 1
                                    ).padStart(2, "0");
                                    const day = String(
                                      viewDate.getDate()
                                    ).padStart(2, "0");
                                    return `${year}-${month}-${day}`;
                                  })();

                                  const currentSlots =
                                    watch("preferredTimeSlot")?.[dateKey] || [];
                                  const slotStr = `${slot.start}-${slot.end}`;
                                  const currentSlotsArray = Array.isArray(
                                    currentSlots
                                  )
                                    ? currentSlots
                                    : [currentSlots];
                                  const isChecked =
                                    currentSlotsArray.includes(slotStr);
                                  const isFullWidth =
                                    ("fullWidth" in slot && slot.fullWidth) ||
                                    false;

                                  return (
                                    <label
                                      key={`${slot.start}-${slot.end}`}
                                      htmlFor={`time-${slot.start}-${slot.end}`}
                                      className={cn(
                                        "flex items-center gap-2 sm:gap-3 rounded-lg border bg-background/80 p-2 sm:p-3 cursor-pointer transition-all",
                                        "hover:border-gold hover:bg-gold/5",
                                        isChecked &&
                                        "border-gold bg-gradient-to-r from-gold/15 to-amber-500/10 shadow-sm",
                                        isFullWidth && "col-span-2"
                                      )}
                                    >
                                      <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={(checked) => {
                                          let newSlots = [...currentSlotsArray];
                                          if (checked) {
                                            newSlots.push(slotStr);
                                          } else {
                                            newSlots = newSlots.filter(
                                              (s) => s !== slotStr
                                            );
                                          }
                                          // Update form
                                          const currentMap =
                                            watch("preferredTimeSlot");
                                          setValue("preferredTimeSlot", {
                                            ...currentMap,
                                            [dateKey]: newSlots,
                                          });
                                        }}
                                        id={`time-${slot.start}-${slot.end}`}
                                        className="border-gold data-[state=checked]:bg-gold data-[state=checked]:text-black"
                                      />
                                      <Icon
                                        className={cn(
                                          "w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0",
                                          slot.icon === Sun
                                            ? "text-yellow-400"
                                            : "text-blue-400"
                                        )}
                                      />
                                      <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-xs sm:text-sm font-semibold text-foreground leading-tight">
                                          {slot.start.slice(0, 5)} -{" "}
                                          {slot.end.slice(0, 5)}
                                        </span>
                                        <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight mt-0.5">
                                          {slot.label}
                                        </span>
                                      </div>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-8 text-muted-foreground text-sm border border-dashed border-gold/20 rounded-lg">
                              Select a date from the list above to configure its
                              time slots
                            </div>
                          )}
                        </div>
                      )}
                      <div className="min-h-[20px]">
                        {errors.preferredTimeSlot && (
                          <ValidationErrorMessage
                            message={
                              (errors.preferredTimeSlot as { message?: string })
                                ?.message ||
                              "Please check your time slot selection"
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Number of People Select */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="numberOfPeople"
                      className="text-foreground flex items-center gap-2"
                    >
                      <Users className="w-4 h-4 text-gold" />
                      <span className="flex items-center gap-1">
                        Number of People
                        <Asterisk className="w-3 h-3 text-red-500" />
                      </span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex items-center"
                          >
                            <Info className="w-3 h-3 text-muted-foreground" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="text-xs">
                          <p>
                            Select the total number of people (including
                            yourself) attending the event
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Select
                      value={numberOfPeople}
                      onValueChange={handleNumberOfPeopleChange}
                    >
                      <SelectTrigger
                        id="numberOfPeople"
                        className={cn(
                          "bg-input border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground",
                          errors.members ? "border-red-500" : "border-gold/30"
                        )}
                      >
                        <SelectValue placeholder="Select number of people" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Person" : "People"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="min-h-[20px]">
                      {errors.members && (
                        <ValidationErrorMessage
                          message={errors.members.message}
                        />
                      )}
                    </div>
                  </div>

                  {/* Members List */}
                  {parseInt(numberOfPeople, 10) > 1 && (
                    <div className="space-y-4">
                      <Label className="text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-gold" /> Additional
                        Members
                      </Label>
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="p-4 border border-gold/30 rounded-lg bg-input/50 space-y-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm text-gold">
                              Member {index + 1}
                            </Label>
                          </div>

                          <div className="flex flex-wrap gap-3 items-end">
                            <div className="space-y-1 flex-1 min-w-[150px]">
                              <Label className="text-xs flex items-center gap-1">
                                Full Name
                                <Asterisk className="w-2.5 h-2.5 text-red-500" />
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      type="button"
                                      className="inline-flex items-center"
                                    >
                                      <Info className="w-2.5 h-2.5 text-muted-foreground" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent className="text-xs">
                                    <p>
                                      Enter the full name of the additional
                                      member
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </Label>
                              <Input
                                placeholder="Full name"
                                {...register(`members.${index}.idName`)}
                                className={cn(
                                  "bg-background border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-sm",
                                  errors.members?.[index]?.idName
                                    ? "border-red-500"
                                    : ""
                                )}
                              />
                              <div className="min-h-[20px]">
                                {errors.members?.[index]?.idName && (
                                  <ValidationErrorMessage
                                    message={
                                      errors.members?.[index]?.idName?.message
                                    }
                                  />
                                )}
                              </div>
                            </div>

                            <div className="space-y-1 flex-1 min-w-[120px]">
                              <Label className="text-xs flex items-center gap-1">
                                Age
                                <span className="text-[10px] text-muted-foreground">
                                  (optional)
                                </span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      type="button"
                                      className="inline-flex items-center"
                                    >
                                      <Info className="w-2.5 h-2.5 text-muted-foreground" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent className="text-xs">
                                    <p>
                                      Enter the age of the additional member
                                      (optional)
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </Label>
                              <Input
                                type="number"
                                placeholder="Age"
                                min={1}
                                max={150}
                                {...register(`members.${index}.idAge`, {
                                  valueAsNumber: true,
                                })}
                                className={cn(
                                  "bg-background border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-sm",
                                  errors.members?.[index]?.idAge
                                    ? "border-red-500"
                                    : ""
                                )}
                              />
                              <div className="min-h-[20px]">
                                {errors.members?.[index]?.idAge && (
                                  <ValidationErrorMessage
                                    message={
                                      errors.members?.[index]?.idAge?.message
                                    }
                                  />
                                )}
                              </div>
                            </div>

                            <div className="space-y-1 flex-1 min-w-[150px]">
                              <Label className="text-xs flex items-center gap-1">
                                Gender
                                <Asterisk className="w-2.5 h-2.5 text-red-500" />
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      type="button"
                                      className="inline-flex items-center"
                                    >
                                      <Info className="w-2.5 h-2.5 text-muted-foreground" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent className="text-xs">
                                    <p>
                                      Select the gender of the additional member
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </Label>
                              <RadioGroup
                                value={watch(`members.${index}.idGender`)}
                                onValueChange={(value) =>
                                  setValue(`members.${index}.idGender`, value)
                                }
                                className="flex gap-2"
                              >
                                <div className="flex items-center space-x-1">
                                  <RadioGroupItem
                                    value="male"
                                    id={`member-${index}-male`}
                                    className="border-gold"
                                  />
                                  <Label
                                    htmlFor={`member-${index}-male`}
                                    className="cursor-pointer text-xs text-foreground"
                                  >
                                    Male
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <RadioGroupItem
                                    value="female"
                                    id={`member-${index}-female`}
                                    className="border-gold"
                                  />
                                  <Label
                                    htmlFor={`member-${index}-female`}
                                    className="cursor-pointer text-xs text-foreground"
                                  >
                                    Female
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <RadioGroupItem
                                    value="others"
                                    id={`member-${index}-others`}
                                    className="border-gold"
                                  />
                                  <Label
                                    htmlFor={`member-${index}-others`}
                                    className="cursor-pointer text-xs text-foreground"
                                  >
                                    Others
                                  </Label>
                                </div>
                              </RadioGroup>
                              <div className="min-h-[20px]">
                                {errors.members?.[index]?.idGender && (
                                  <ValidationErrorMessage
                                    message={
                                      errors.members?.[index]?.idGender?.message
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Quantity (always shown) */}
              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Package className="w-4 h-4 text-gold" />
                  <span className="flex items-center gap-1">
                    Quantity of Rudraksha
                    <Asterisk className="w-3 h-3 text-red-500" />
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex items-center"
                      >
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs">
                      <p>
                        Enter the number of Rudraksha beads you want to pre-book
                        (1-10)
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  {...register("rudrakshaQuantity", { valueAsNumber: true })}
                  className={cn(
                    "bg-input border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground",
                    errors.rudrakshaQuantity ? "border-red-500" : ""
                  )}
                />
                <div className="min-h-[20px]">
                  {errors.rudrakshaQuantity && (
                    <ValidationErrorMessage
                      message={errors.rudrakshaQuantity.message}
                    />
                  )}
                </div>
              </div>

              {/* Price Summary */}
              <div className="p-4 bg-card rounded-lg border border-gold/20 shadow-sm">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground/70">
                    Price per Rudraksha
                  </span>
                  <span className="text-foreground font-medium">₹999</span>
                </div>
                <div className="border-t border-gold/20 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gold">Total Amount</span>
                    <span className="text-gold">
                      ₹{999 * (rudrakshaQuantity || 1)}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/70 mt-1">
                    Full payment to be made now
                  </p>
                </div>
              </div>

              {participatingInEvent && (
                <p className="text-xs text-muted-foreground text-center">
                  You are participating in the event with{" "}
                  {parseInt(numberOfPeople, 10)} person(s)
                </p>
              )}

              <p className="text-xs text-muted-foreground text-center">
                Cancel anytime before the event starts for full refund
              </p>

              <div className="text-center pt-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) =>
                      setTermsAccepted(checked as boolean)
                    }
                    className="mt-0.5 border-gold data-[state=checked]:bg-gold data-[state=checked]:text-black"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-xs text-muted-foreground cursor-pointer leading-relaxed"
                  >
                    I agree to the{" "}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-dark underline inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Terms and Conditions
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Label>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="border-t border-gold/20 px-6 py-4 flex-shrink-0 bg-card-gradient rounded-b-2xl">
            <Button
              type="submit"
              variant="divine"
              className="w-full"
              disabled={isLoading || !termsAccepted}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RudrakshaDetailsStep;
