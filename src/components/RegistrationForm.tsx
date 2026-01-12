import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  User,
  Phone,
  MapPin,
  ChevronDownIcon,
  Clock,
  Sun,
  Moon,
  Loader2,
  Info,
  Asterisk,
  Users,
  X,
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  registrationFormSchema,
  RegistrationFormValues,
} from "@/schemas/registration-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import ValidationErrorMessage from "./ui/validation-error-message";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { ScrollArea } from "./ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { generalPostFunction } from "@/utils/commonFun";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import video1 from "@/assets/video1.mp4";


interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
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

const RegistrationForm = ({ isOpen, onClose }: RegistrationFormProps) => {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState<string>("1");

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
    formState: { errors },
    setValue,
    reset,
    watch,
    getValues,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    mode: "onChange",
    defaultValues: {
      members: [],
      preferredTimeSlot: {},
      preferredDate: [],
      gender: "",
      addressText: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      district: "",
      state: "",
      pinCode: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync members array with numberOfPeople selection
  useEffect(() => {
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
  }, [numberOfPeople, fields.length, append, remove]);

  const onSubmit = async (data: RegistrationFormValues) => {
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

    // Format the payload according to API requirements
    interface FormattedPayload {
      fullName: string;
      phoneNumber: string;
      age?: number;
      gender: string;
      preferredDate: string[];
      preferredTimeSlot: Record<string, string | string[]>;
      numberOfPeople: number;
      addressText?: string;
      members?: Array<{
        idName: string;
        idAge?: number;
        idGender: string;
      }>;
    }

    const formattedData: FormattedPayload = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      preferredDate: data.preferredDate,
      preferredTimeSlot: data.preferredTimeSlot,
      numberOfPeople: parseInt(numberOfPeople, 10),
    };

    // Only include age if it has a value (optional field)
    if (data.age !== undefined && data.age !== null && !isNaN(data.age)) {
      formattedData.age = data.age;
    }

    // Only include addressText if it has a value (optional field)
    if (combinedAddress && combinedAddress.trim() !== "") {
      formattedData.addressText = combinedAddress;
    }

    // Format members array
    if (data.members && data.members.length > 0) {
      formattedData.members = data.members.map((member) => {
        const memberData: { idName: string; idAge?: number; idGender: string } =
        {
          idName: member.idName,
          idGender: member.idGender,
        };
        // Only include idAge if it has a value (optional field)
        if (
          member.idAge !== undefined &&
          member.idAge !== null &&
          !isNaN(member.idAge)
        ) {
          memberData.idAge = member.idAge;
        }
        return memberData;
      });
    }
    setIsLoading(true);
    try {
      const response = await generalPostFunction(
        "/launch-event/free-registration",
        formattedData
      );
      console.log("response: ", response);
      if (response.status === 200 || response.status === 201) {
        setIsSubmitted(true);
        reset();
        setViewDate(undefined);
        setNumberOfPeople("1");
        setIsLoading(false);
        toast({
          title: "🙏 Registration Successful!",
          description: "You are now registered for Maha Shivaratri 2025",
        });
        onClose();
      } else {
        setIsLoading(false);
        toast({
          title: "Registration Failed",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      setIsLoading(false);
      // Handle axios error response
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { status?: number; data?: { message?: string } };
        };
        const errorMessage =
          axiosError.response?.data?.message ||
            axiosError.response?.status === 400
            ? axiosError.response?.data?.message || "Invalid form data. Please check your inputs."
            : "Registration failed. Please try again.";

        toast({
          title: "Registration Failed",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration Failed",
          description: "An error occurred. Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  const handleNumberOfPeopleChange = (value: string) => {
    setNumberOfPeople(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-8xl h-[95vh] bg-card-gradient rounded-2xl border border-gold/30 shadow-divine animate-in fade-in zoom-in duration-300 flex flex-col overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 rounded-full p-2 bg-background/90 hover:bg-background border border-gold/30 hover:border-gold text-muted-foreground hover:text-foreground transition-all shadow-sm hover:shadow-md"
          aria-label="Close registration form"
        >
          <X className="w-5 h-5" />
        </button>
        {isSubmitted ? (
          <div className="text-center py-8 px-6">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-divine-gradient flex items-center justify-center animate-glow">
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold text-gold mb-2">
              Om Namah Shivaya!
            </h3>
            <p className="text-muted-foreground mb-6">
              Your registration is confirmed. We will contact you with event
              details.
            </p>
            <Button
              variant="divine"
              onClick={() => {
                setIsSubmitted(false);
                reset();
                setViewDate(undefined);
                setNumberOfPeople("1");
                onClose();
              }}
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col md:flex-row overflow-hidden w-full">
            {/* Video side */}
            <div className="relative w-full md:w-1/2 h-48 md:h-full overflow-hidden">
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

              {/* Content overlay */}
              <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8 text-left">
                <div className="relative">
                  {/* Subtle background gradient behind text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/30 md:to-transparent rounded-lg -m-4 md:-m-6" />
                  
                  <div className="relative p-4 md:p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      Maha Shivaratri 2026
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-gold mb-3 leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      Immerse in the divine grace of
                      <span className="block text-3xl md:text-4xl text-white mt-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                        Lord Shiva
                      </span>
                    </h3>
                    <p className="text-sm md:text-base text-white font-medium max-w-sm leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                      Experience a sacred night of meditation, devotion and inner
                      stillness under the benevolent gaze of Mahadev.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form side */}
            <div className="flex w-full md:w-1/2 flex-col h-full bg-card-gradient/95 backdrop-blur-sm md:border-l md:border-gold/20">
              <div className="text-center py-6 px-6 border-b border-gold/20 flex-shrink-0">
                <h3 className="font-display text-2xl font-bold text-gold mb-2">
                  Free Registration
                </h3>
                <p className="text-muted-foreground text-sm">
                  Join us for the divine Maha Shivaratri experience
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col flex-1 min-h-0 overflow-hidden"
              >
                <div className="flex-1 min-h-0 px-6">
                  <ScrollArea className="h-full">
                    <div className="space-y-4 py-4 pr-4">
                      {/* Row 1: Full Name | Phone Number */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="fullName"
                            className="text-foreground flex items-center gap-2"
                          >
                            <User className="w-4 h-4 text-gold" />
                            <span className="flex items-center gap-1">
                              Full Name
                              <Asterisk className="w-3 h-3 text-red-500" />
                            </span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3 h-3 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="text-xs">
                                <p>
                                  Full name is required for identification
                                  purposes
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </Label>
                          <Input
                            id="fullName"
                            placeholder="Enter your full name"
                            {...register("fullName")}
                            className={cn(
                              "bg-input focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground placeholder:text-muted-foreground",
                              errors.fullName
                                ? "border-red-500"
                                : "border-gold/30"
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
                          <Label
                            htmlFor="phoneNumber"
                            className="text-foreground flex items-center gap-2"
                          >
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4 text-gold" /> Phone Number
                              <Asterisk className="w-3 h-3 text-red-500" />
                            </span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3 h-3 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="text-xs">
                                <p>
                                  Phone number is required for communication
                                  purposes
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </Label>
                          <Input
                            id="phoneNumber"
                            type="tel"
                            placeholder="Enter your phone number"
                            maxLength={10}
                            {...register("phoneNumber")}
                            className={cn(
                              "bg-input border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground placeholder:text-muted-foreground",
                              errors.phoneNumber
                                ? "border-red-500"
                                : "border-gold/30"
                            )}
                          />
                          <div className="min-h-[20px]">
                            {errors.phoneNumber && (
                              <ValidationErrorMessage
                                message={errors.phoneNumber.message}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Age | Gender */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="age"
                            className="text-foreground flex items-center gap-2"
                          >
                            <User className="w-4 h-4 text-gold" />
                            <span className="flex items-center gap-1">
                              Age
                              <span className="text-xs text-muted-foreground">
                                (optional)
                              </span>
                            </span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3 h-3 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="text-xs">
                                <p>Enter your age in years (optional)</p>
                              </TooltipContent>
                            </Tooltip>
                          </Label>
                          <Input
                            id="age"
                            type="number"
                            placeholder="Enter your age"
                            {...register("age", { valueAsNumber: true })}
                            className={cn(
                              "bg-input border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground placeholder:text-muted-foreground",
                              errors.age ? "border-red-500" : "border-gold/30"
                            )}
                            min={1}
                            max={150}
                          />
                          <div className="min-h-[20px]">
                            {errors.age && (
                              <ValidationErrorMessage
                                message={errors.age.message}
                              />
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
                              <TooltipTrigger>
                                <Info className="w-3 h-3 text-muted-foreground" />
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
                                <RadioGroupItem value="male" id="gender-male" />
                                <Label
                                  htmlFor="gender-male"
                                  className="cursor-pointer"
                                >
                                  Male
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="female"
                                  id="gender-female"
                                />
                                <Label
                                  htmlFor="gender-female"
                                  className="cursor-pointer"
                                >
                                  Female
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="others"
                                  id="gender-others"
                                />
                                <Label
                                  htmlFor="gender-others"
                                  className="cursor-pointer"
                                >
                                  Others
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <div className="min-h-[20px]">
                            {errors.gender && (
                              <ValidationErrorMessage
                                message={errors.gender.message}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Address Fields (3 columns per row) */}
                      <div className="space-y-4">
                        <Label className="text-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gold" />
                          <span className="flex items-center gap-1">
                            Address
                            <span className="text-xs text-muted-foreground">
                              (optional)
                            </span>
                          </span>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-3 h-3 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="text-xs">
                              <p>Address is optional for registration</p>
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
                              placeholder="Street address, P.O. box"
                              {...register("addressLine1")}
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
                            <Label
                              htmlFor="city"
                              className="text-sm text-foreground"
                            >
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
                                <ValidationErrorMessage
                                  message={errors.city.message}
                                />
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
                                errors.district
                                  ? "border-red-500"
                                  : "border-gold/30"
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
                            <Label
                              htmlFor="state"
                              className="text-sm text-foreground"
                            >
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
                                errors.pinCode
                                  ? "border-red-500"
                                  : "border-gold/30"
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
                      </div>

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
                              {/* <span className="text-xs text-muted-foreground">(optional)</span> */}
                            </span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3 h-3 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="text-xs">
                                <p>
                                  Date is required for check availability of slots
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
                                    watch("preferredDate").length > 0
                                    ? `${watch("preferredDate").length} date(s) selected`
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
                                  selected={watch("preferredDate").map((d) => new Date(d))}
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
                                    const currentSlots = getValues("preferredTimeSlot") || {};
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
                            <input type="hidden" {...register("preferredDate")} />
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
                              Choose a time for your visit
                              <Asterisk className="w-3 h-3 text-red-500" />
                              {/* <span className="text-xs text-muted-foreground">(optional)</span> */}
                            </span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3 h-3 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="text-xs">
                                <p>
                                  Time is required for check availability of slots
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </Label>
                          <div
                            className={cn(
                              "rounded-xl border p-4 shadow-inner bg-background/60 transition-colors",
                              watch("preferredDate").length === 0
                                ? "opacity-70 pointer-events-none"
                                : "border-gold/30 bg-input/80"
                            )}
                          >
                            {watch("preferredDate").length === 0 ? (
                              <div className="flex items-center justify-center h-24 text-muted-foreground text-sm">
                                Please select a date first
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                  <span className="text-xs text-muted-foreground">
                                    Selected Dates (click to configure slots):
                                  </span>
                                  <div className="flex flex-wrap gap-2">
                                    {watch("preferredDate").map((dateStr) => {
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
                                          variant={
                                            isSelected ? "default" : "outline"
                                          }
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
                                          watch("preferredTimeSlot")?.[dateKey] ||
                                          [];
                                        const slotStr = `${slot.start}-${slot.end}`;
                                        const currentSlotsArray = Array.isArray(
                                          currentSlots
                                        )
                                          ? currentSlots
                                          : [currentSlots];
                                        const isChecked =
                                          currentSlotsArray.includes(slotStr);
                                        const isFullWidth =
                                          ("fullWidth" in slot &&
                                            slot.fullWidth) ||
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
                                                let newSlots = [
                                                  ...currentSlotsArray,
                                                ];
                                                if (checked) {
                                                  newSlots.push(slotStr);
                                                } else {
                                                  newSlots = newSlots.filter(
                                                    (s) => s !== slotStr
                                                  );
                                                }
                                                // Update form
                                                const currentMap = watch(
                                                  "preferredTimeSlot"
                                                );
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
                                    Select a date from the list above to configure
                                    its time slots
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="min-h-[20px]">
                            {errors.preferredTimeSlot && (
                              <ValidationErrorMessage
                                message={
                                  (errors.preferredTimeSlot as { message?: string })?.message ||
                                  "Please check your time slot selection"
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>

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
                            <TooltipTrigger>
                              <Info className="w-3 h-3 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="text-xs">
                              <p>
                                Select the total number of people (including yourself) attending the event
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
                                  <Label
                                    htmlFor={`members.${index}.idName`}
                                    className="text-xs flex items-center gap-1"
                                  >
                                    Full Name
                                    <Asterisk className="w-2.5 h-2.5 text-red-500" />
                                  </Label>
                                  <Input
                                    id={`members.${index}.idName`}
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

                                <div className="space-y-1 flex-1 min-w-[150px]">
                                  <Label
                                    htmlFor={`members.${index}.idAge`}
                                    className="text-xs flex items-center gap-1"
                                  >
                                    Age
                                    <span className="text-[10px] text-muted-foreground">
                                      (optional)
                                    </span>
                                  </Label>
                                  <Input
                                    id={`members.${index}.idAge`}
                                    type="number"
                                    placeholder="Age"
                                    {...register(`members.${index}.idAge`, {
                                      valueAsNumber: true,
                                    })}
                                    className={cn(
                                      "bg-background border-gold/30 focus:border-gold-dark focus-visible:border-gold-dark focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-sm",
                                      errors.members?.[index]?.idAge
                                        ? "border-red-500"
                                        : ""
                                    )}
                                    min={1}
                                    max={150}
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
                                  <Label
                                    htmlFor={`members.${index}.idGender`}
                                    className="text-xs flex items-center gap-1"
                                  >
                                    Gender
                                    <Asterisk className="w-2.5 h-2.5 text-red-500" />
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
                                        className="w-4 h-4"
                                      />
                                      <Label
                                        htmlFor={`member-${index}-male`}
                                        className="text-xs cursor-pointer"
                                      >
                                        Male
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <RadioGroupItem
                                        value="female"
                                        id={`member-${index}-female`}
                                        className="w-4 h-4"
                                      />
                                      <Label
                                        htmlFor={`member-${index}-female`}
                                        className="text-xs cursor-pointer"
                                      >
                                        Female
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <RadioGroupItem
                                        value="others"
                                        id={`member-${index}-others`}
                                        className="w-4 h-4"
                                      />
                                      <Label
                                        htmlFor={`member-${index}-others`}
                                        className="text-xs cursor-pointer"
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
                    </div>
                  </ScrollArea>
                </div>

                <div className="border-t border-gold/20 px-6 py-4 flex-shrink-0 bg-card-gradient">
                  <p className="text-xs text-muted-foreground text-center mb-4">
                    No entry fees • Registration is required • Limited slots
                    available
                  </p>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="cosmic"
                      className="flex-1 text-white"
                      onClick={() => {
                        reset();
                        setViewDate(undefined);
                        setNumberOfPeople("1");
                        onClose();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="divine"
                      className="flex-1"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Register Now"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
