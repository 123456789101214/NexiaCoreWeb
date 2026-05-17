import { ShoppingCart, Pill, Shirt, Utensils } from "lucide-react";

export const SOLUTIONS = [
  {
    icon: ShoppingCart,
    iconColor: "text-blue-500",
    title: "Supermarkets",
    features: ["GRN management", "Bulk pricing", "Expiry tracking", "Cashier terminals", "Supplier balances"],
    bg: "bg-blue-50/50 hover:border-blue-200"
  },
  {
    icon: Pill,
    iconColor: "text-emerald-500",
    title: "Pharmacies",
    features: ["Expiry alerts", "Medication stock tracking", "Customer credit accounts", "Supplier management"],
    bg: "bg-emerald-50/50 hover:border-emerald-200"
  },
  {
    icon: Shirt,
    iconColor: "text-purple-500",
    title: "Fashion Stores",
    features: ["Inventory by category", "Smart discounts", "Sales analytics", "Staff access control"],
    bg: "bg-purple-50/50 hover:border-purple-200"
  },
  {
    icon: Utensils,
    iconColor: "text-rose-500",
    title: "Restaurants & Cafes",
    features: ["Fast checkout", "Customer loyalty", "Daily reports", "Ingredient stock management"],
    bg: "bg-rose-50/50 hover:border-rose-200"
  }
];