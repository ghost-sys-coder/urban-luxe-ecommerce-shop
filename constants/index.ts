
import { Inbox, BarChart2, Users, ShoppingCart, TrendingUp, AlertTriangle, LayoutDashboard } from "lucide-react"

// Additional Admin Parameters
export const adminParameters = [
    {
        category: "Sales Metrics",
        items: [
            {title: "Products List", url: "/admin", icon:LayoutDashboard},
            { title: "Total Sales", url: "/admin/products/sales", icon: BarChart2 },
            { title: "Orders", url: "/admin/products/orders", icon: ShoppingCart },
        ],
    },
    {
        category: "Customer Metrics",
        items: [
            { title: "Customer List", url: "/admin/customer/lists", icon: Users },
            { title: "New vs Returning", url: "/admin/customer/customer-metrics", icon: TrendingUp },
        ],
    },
    {
        category: "Operational Metrics",
        items: [
            { title: "Order Fulfillment", url: "/admin/operations/fulfillment", icon: TrendingUp },
            { title: "Inventory", url: "/admin/operations/inventory", icon: ShoppingCart },
        ],
    },
    {
        category: "Alerts & Notifications",
        items: [
            { title: "Low Stock Alerts", url: "/admin/system/alerts", icon: AlertTriangle },
            { title: "System Notifications", url: "/admin/system/notifications", icon: Inbox },
        ],
    },
]
