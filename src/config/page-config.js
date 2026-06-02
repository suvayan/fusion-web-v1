import { lazy } from "react";

const Login = lazy(()=>import("@/pages/auth/Login"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));

const Dashboard  = lazy(()=>import("@/pages/Dashboard"));

// Membership Management
const EditMember = lazy(()=>import("@/pages/membership-management/EditMember"));
const EditIndMember = lazy(()=>import("@/pages/membership-management/EditIndMember"));
const CancelMembership = lazy(()=>import("@/pages/membership-management/CancelMembership"));

// Account Mamagement
const PaymentReceive = lazy(()=>import("@/pages/account-management/PaymentReceive"));
const PaymentProcess = lazy(()=>import("@/pages/account-management/PaymentProcess"));
const ModifyReceipt = lazy(()=>import("@/pages/account-management/ModifyReceipt"));
const ViewProformaInvoice = lazy(()=>import("@/pages/account-management/ViewProformaInvoice"));
const CreateProformaInvoice = lazy(()=>import("@/pages/account-management/CreateProformaInvoice"));
const ViewGSTInvoice = lazy(()=>import("@/pages/account-management/ViewGSTInvoice"));
const InterestCalculation = lazy(()=>import("@/pages/account-management/InterestCalculation"));
const AdvertisementProcess = lazy(()=>import("@/pages/account-management/AdvertisementProcess"));


// Auth pages
export const authPagesConfig = [
    { id: "login", title: "Login", path: "/login", component: Login, isPrivate: false },
    { id: "forgot-password", title: "Forgot Password", path: "/forgot-password", component: ForgotPassword, isPrivate: false }
]


export const pagesConfig = [
    {
        id: "dashboard",
        title: "Dashboard",
        icon: "bx bx-home-alt",
        path: "/",
        isPrivate: true,
        component: Dashboard
    },
    {
        id: "account-management",
        title: "Account Management",
        icon: "bx bx-wallet icon-account",
        path: "/account-management",
        children: [
            { id: "payment-receive", title: "Payment Receive", icon: "bx bx-radio-circle", path: "/account-management/payment-receive", component: PaymentReceive, isPrivate: true, },
            { id: "modify-receipt", title: "Modify Receipt", icon: "bx bx-radio-circle", path: "/account-management/modify-receipt", component: ModifyReceipt, isPrivate: true, },
            { id: "payment-process", title: "Payment Process (New)", icon: "bx bx-radio-circle", path: "/account-management/payment-process", component: PaymentProcess, isPrivate: true, },
            // { id: "advertisement-process", title: "Advertisement Process (WR)", icon: "bx bx-radio-circle", path: "/account-management/advertisement-process", component: AdvertisementProcess, isPrivate: true, },
            { id: "create-proforma-invoice", title: "Create Proforma Invoice", icon: "bx bx-radio-circle", path: "/account-management/create-proforma-invoice", component: CreateProformaInvoice, isPrivate: true, },
            { id: "view-proforma-invoice", title: "View Proforma Invoice", icon: "bx bx-radio-circle", path: "/account-management/view-proforma-invoice", component: ViewProformaInvoice, isPrivate: true, },
            // { id: "view-gst-invoice", title: "View GST Invoice", icon: "bx bx-radio-circle", path: "/account-management/view-gst-invoice", component: ViewGSTInvoice, isPrivate: true, },
            // { id: "interest-calculation", title: "InterestCalculation", icon: "bx bx-radio-circle", path: "/account-management/interest-calculation", component: InterestCalculation, isPrivate: true, }
        ]
    },
    {
        id: "membership-management",
        title: "Membership Management",
        icon: "bx bx-id-card icon-membership",
        path: "/membership-management",
        children: [
            { id: "edit-member", title: "Edit Member", icon: "bx bx-radio-circle", path: "/membership-management/edit-member", component: EditMember, isPrivate: true, },
            { id: "edit-ind-member", title: "Edit IND Member", icon: "bx bx-radio-circle", path: "/membership-management/edit-ind-member", component: EditIndMember, isPrivate: true, },
            { id: "cancel-membership", title: "Cancel Membership", icon: "bx bx-radio-circle", path: "/membership-management/cancel-membership", component: CancelMembership, isPrivate: true, },
        ]
    }
];


export const allPagesConfig = [...pagesConfig, ...authPagesConfig]