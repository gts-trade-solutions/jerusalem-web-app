import {
  Home, HeartHandshake, Sparkles, Users, Music, Flame, ShieldCheck,
  DoorOpen, Globe2, ScrollText, HandHeart, Sprout, Wheat, Heart, Hand,
  BookOpen, Church, Sun, Play, Pause, SkipBack, SkipForward, Plus, X,
  Menu, ChevronRight, ChevronLeft, ChevronDown, MapPin, Calendar, Clock,
  CheckCircle2, Circle, Bell, Settings, Sun as SunIcon, Moon, LogOut, LogIn,
  Search, Filter, ArrowRight, ArrowUpRight, Star, Quote, Mail, Phone,
  BadgeCheck, Lock, KeyRound, Smartphone, Eye, EyeOff, UserCheck, Baby,
  FileText, AlertTriangle, Headphones, Mic2, Music2, Radio, Video, Upload,
  Handshake, Utensils, Share2, MessageCircle, Gift, Download, ListMusic,
  CalendarDays, Sunrise, Compass, Sparkle, TreePine, Users2, UserPlus,
  Wallet, GraduationCap, Briefcase, ChefHat, PartyPopper, MonitorPlay,
  ThumbsUp, Send, Bookmark, MapPinned, Navigation, Cross, Wind, Info,
  ShieldAlert, Fingerprint, RefreshCw, MonitorSmartphone, Trophy, LifeBuoy,
  Volume2, Repeat, Shuffle, type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  Home, HeartHandshake, Sparkles, Users, Music, Flame, ShieldCheck,
  DoorOpen, Globe2, ScrollText, HandHeart, Sprout, Wheat, Heart, Hand,
  BookOpen, Church, Sun, Play, Pause, SkipBack, SkipForward, Plus, X,
  Menu, ChevronRight, ChevronLeft, ChevronDown, MapPin, Calendar, Clock,
  CheckCircle2, Circle, Bell, Settings, SunIcon, Moon, LogOut, LogIn,
  Search, Filter, ArrowRight, ArrowUpRight, Star, Quote, Mail, Phone,
  BadgeCheck, Lock, KeyRound, Smartphone, Eye, EyeOff, UserCheck, Baby,
  FileText, AlertTriangle, Headphones, Mic2, Music2, Radio, Video, Upload,
  Handshake, Utensils, Share2, MessageCircle, Gift, Download, ListMusic,
  CalendarDays, Sunrise, Compass, Sparkle, TreePine, Users2, UserPlus,
  Wallet, GraduationCap, Briefcase, ChefHat, PartyPopper, MonitorPlay,
  ThumbsUp, Send, Bookmark, MapPinned, Navigation, Cross, Wind, Info,
  ShieldAlert, Fingerprint, RefreshCw, MonitorSmartphone, Trophy, LifeBuoy,
  Volume2, Repeat, Shuffle,
};

export interface IconProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
}

export function Icon({ name, className, size = 20, strokeWidth = 1.75 }: IconProps) {
  const Cmp = registry[name] ?? Sparkles;
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} aria-hidden />;
}

export type IconName = keyof typeof registry;
