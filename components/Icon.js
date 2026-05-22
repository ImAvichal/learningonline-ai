// components/Icon.js
//
// Central icon registry. Data files (modules, templates, tiers, etc.) keep a
// simple emoji string in their `icon` field — this component maps that emoji
// to a consistent thin-line Lucide icon at render time.
//
// Why keep the emoji as the key (rather than rewriting every data file to a
// component reference)?
//   • Data files stay plain serialisable strings — no imports, no breakage.
//   • One place owns the emoji → Lucide mapping.
//   • Render sites change from `{x.icon}` to `<Icon name={x.icon} />`.
//   • Unknown/unmapped emoji fall back to a neutral dot instead of crashing.
//
// Usage:
//   <Icon name={mod.icon} size={20} />              // plain inline icon
//   <Icon name={tier.icon} className="text-blue-bright" />
//
// For the "chip" treatment, wrap <Icon> in a styled span at the call site
// (we keep chip styling at the call site so each context controls its own look).

import {
  Search, PenLine, Code2, Palette, Clapperboard, Mic, Presentation, Zap,
  LineChart, Bot, GraduationCap, MessagesSquare, BrainCircuit, Users, Rocket,
  BarChart3, Database, Scale, Landmark, SlidersHorizontal, CheckCircle2,
  Shield, Map as MapIcon, Wrench, Hash, ClipboardList, Briefcase, Lightbulb,
  User, Building2, Building, Target, Sprout, Sparkles, FlaskConical, ShoppingCart,
  MessageCircle, CalendarDays, Calendar, Ruler, Megaphone, DollarSign, Baby,
  Eye, Hotel, Banknote, Stethoscope, Home, Trophy, Ticket, Moon, Sun, Plane,
  AlertTriangle, Recycle, LayoutGrid, BookOpen, Layers, Cog, TrendingUp,
} from 'lucide-react'

// emoji → Lucide component
const REGISTRY = {
  '🔍': Search,
  '✍️': PenLine,
  '💻': Code2,
  '🎨': Palette,
  '🎬': Clapperboard,
  '🎙️': Mic,
  '📊': Presentation,
  '⚡': Zap,
  '📈': TrendingUp,
  '🤖': Bot,
  '🎓': GraduationCap,
  '💬': MessageCircle,
  '🧠': BrainCircuit,
  '👥': Users,
  '🚀': Rocket,
  '🗄️': Database,
  '📚': BookOpen,
  '⚖️': Scale,
  '🤝': Users,
  '🏛️': Landmark,
  '🎛️': SlidersHorizontal,
  '✅': CheckCircle2,
  '🛡️': Shield,
  '🗺️': MapIcon,
  '🔧': Wrench,
  '🔢': Hash,
  '📋': ClipboardList,
  '💼': Briefcase,
  '💡': Lightbulb,
  '👤': User,
  '🏢': Building2,
  '🏗️': Building,
  '🎯': Target,
  '🌱': Sprout,
  '🧹': Sparkles,
  '🧪': FlaskConical,
  '🛒': ShoppingCart,
  '🗣️': Megaphone,
  '🗓️': CalendarDays,
  '📢': Megaphone,
  '📐': Ruler,
  '📅': Calendar,
  '💰': DollarSign,
  '👧': Baby,
  '👀': Eye,
  '🏨': Hotel,
  '🏦': Banknote,
  '🏥': Stethoscope,
  '🏠': Home,
  '🏆': Trophy,
  '🎫': Ticket,
  '🌙': Moon,
  '☀️': Sun,
  '✈️': Plane,
  '⚠️': AlertTriangle,
  '♻️': Recycle,
  '⬛': LayoutGrid,
}

export default function Icon({ name, size = 20, strokeWidth = 1.75, className = '' }) {
  const Cmp = REGISTRY[name]
  if (!Cmp) {
    // Graceful fallback for any unmapped key — a neutral small dot.
    return (
      <span
        className={`inline-block rounded-full bg-current opacity-40 ${className}`}
        style={{ width: size * 0.4, height: size * 0.4 }}
        aria-hidden="true"
      />
    )
  }
  return <Cmp size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />
}
