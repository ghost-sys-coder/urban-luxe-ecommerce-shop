
import { Inbox, BarChart2, Users, ShoppingCart, TrendingUp, AlertTriangle, LayoutDashboard } from "lucide-react"
import { ToastPosition } from "react-hot-toast"

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



// react hot toast options
export const toastSuccessOptions = {
    position: 'top-right' as ToastPosition,
    duration: 4000,
    style: {
      backgroundColor: 'lightgreen',
      padding: 10,
      borderRadius: 10,
      color: '#fff'
    }
}

export const toastErrorOptions ={
    position: 'top-right' as ToastPosition,
    duration: 3000,
    className: 'bg-theme-500 text-white',
    style: {
        padding: '10px 15px',
        borderRadius: '10px',
        marginTop: '15px'
    }
}