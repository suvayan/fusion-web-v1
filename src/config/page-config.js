import { lazy } from "react";

const Login = lazy(()=>import("@/pages/auth/login"));
const ForgotPassword = lazy(() => import("@/pages/auth/forgot-password"));

const Dashboard  = lazy(()=>import("@/pages/Dashboard"));

// Membership Management
const EditMember = lazy(()=>import("@/pages/membership-management/edit-member"));
const EditIndMember = lazy(()=>import("@/pages/membership-management/edit-ind-member"));
const CancelMembership = lazy(()=>import("@/pages/membership-management/cancel-membership"));
const ConvertFellowMember = lazy(()=>import("@/pages/membership-management/convert-ellow-member"));
const NewFellowMembership = lazy(()=>import("@/pages/membership-management/new-fellow-membership"));

// Account Mamagement
const PaymentReceive = lazy(()=>import("@/pages/account-management/payment-receive"));
const PaymentProcess = lazy(()=>import("@/pages/account-management/PaymentProcess"));
const ModifyReceipt = lazy(()=>import("@/pages/account-management/ModifyReceipt"));
const ViewProformaInvoice = lazy(()=>import("@/pages/account-management/ViewProformaInvoice"));
const CreateProformaInvoice = lazy(()=>import("@/pages/account-management/CreateProformaInvoice"));


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
            { 
                id: "payment-receive", title: "Payment Receive", 
                icon: "bx bx-radio-circle", 
                path: "/account-management/payment-receive", 
                component: PaymentReceive, isPrivate: true, 
            },
            { 
                id: "modify-receipt", title: "Modify Receipt", 
                icon: "bx bx-radio-circle", 
                path: "/account-management/modify-receipt", 
                component: ModifyReceipt, isPrivate: true, 
            },
            { 
                id: "payment-process", title: "Payment Process (New)", 
                icon: "bx bx-radio-circle", 
                path: "/account-management/payment-process", 
                component: PaymentProcess, isPrivate: true, 
            },
            { 
                id: "create-proforma-invoice", title: "Create Proforma Invoice", 
                icon: "bx bx-radio-circle", path: "/account-management/create-proforma-invoice", 
                component: CreateProformaInvoice, isPrivate: true, 
            },
            { 
                id: "view-proforma-invoice", title: "View Proforma Invoice", 
                icon: "bx bx-radio-circle", 
                path: "/account-management/view-proforma-invoice", 
                component: ViewProformaInvoice, isPrivate: true, 
            },
           
        ]
    },
    {
        id: "membership-management",
        title: "Membership Management",
        icon: "bx bx-id-card icon-membership",
        path: "/membership-management",
        children: [
            { 
                id: "edit-member", title: "Edit Member Details", 
                icon: "bx bx-radio-circle", path: "/membership-management/edit-member", 
                component: EditMember, isPrivate: true, 
            },
            { 
                id: "edit-ind-member", title: "Edit Ind. Member Details", 
                icon: "bx bx-radio-circle", path: "/membership-management/edit-ind-member", 
                component: EditIndMember, isPrivate: true, 
            },
            { 
                id: "cancel-membership", title: "Cancel Membership", 
                icon: "bx bx-radio-circle", 
                path: "/membership-management/cancel-membership", 
                component: CancelMembership, isPrivate: true, 
            },
            { 
                id: "convert-fellow-member", title: "Convert Fellow Member", 
                icon: "bx bx-radio-circle", 
                path: "/membership-management/convert-fellow-member", 
                component: ConvertFellowMember, isPrivate: true, 
            },
            { 
                id: "new-fellow-member", title: "New Fellow Member", 
                icon: "bx bx-radio-circle", path: "/membership-management/new-fellow-membership", 
                component: NewFellowMembership, isPrivate: true, 
            },
        ]
    }
];


export const allPagesConfig = [...pagesConfig, ...authPagesConfig]