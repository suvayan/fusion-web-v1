// Before:
// import Dashboard from '../pages/Demo/Dashboard';

// After:
import { lazy } from "react";
// import MembershipMaster from "../pages/mambership-master/MembershipMaster";

const Dashboard = lazy(() => import('../pages/Demo/Dashboard'));
const UserRoles = lazy(() => import('../pages/user-roles/UserRoles'));
const AccessControl = lazy(() => import('../pages/access-control/AccessControl'));
const UserProfile = lazy(() => import('../pages/user-profile/UserProfile'));
const Login = lazy(() => import('../pages/auth/Login'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const Reports = lazy(() => import('../pages/reports/Reports'));
const Master = lazy(() => import('../pages/master/Master'));
const CancelMemberShip = lazy(() => import('../pages/cancel-membership/CancelMemberShip'));
const EditMember = lazy(() => import('../pages/edit-member/EditMember'));
const EditindMember = lazy(() => import('../pages/edit-ind-member/EditIndMember'));
const ExitingStudent = lazy(() => import('../pages/exiting-student/ExitingStudent'));
const PaymentProcess = lazy(() => import('../pages/payment-process/PaymentProcess'));
// const PaymentReceiveEdit = lazy(() => import('../pages/payment-receive/PaymentReceiveEdit'));
// const PaymentProcessNew = lazy(() => import('../pages/payment-process-new/PaymentProcessNew'));
const PaymentReceive = lazy(() => import('../pages/payment-receive/PaymentReceive'));
const ModifyReceipt = lazy(() => import('../pages/modify-receipt/ModifyReceipt'));
const PerformanceInvoice = lazy(() => import('../pages/performance-invoice/PerformanceInvoice'));
const PostalRegistration = lazy(() => import('../pages/postal-registration/PostalRegistration'));
const GenerateIssue = lazy(() => import('../pages/generat-issue/Generateissue'));
const ArticleRecording = lazy(() => import('../pages/article-recording/ArticleRecording'));
const ComplimentryRecording = lazy(() => import('../pages/complimentry-recording/ComplimentryRecording'));
const PerformaInvoice = lazy(() => import('../pages/performa-invoice/PerformaInvoice'));
const ChangeSubscriptionsPeriod = lazy(() => import('../pages/change-subscriptions-period/ChangeSubscriptionsPeriod'));
const ChangeSubscribersPeriod = lazy(() => import('../pages/change-subscribers-period/ChangeSubscribersPeriod'));
const EmailInvoice = lazy(() => import('../pages/email-invoice/EmailInvoice'));

// const ChangeSubscription = lazy(() => import('../pages/change-subscription/ChangeSubscription'));
const AccountReports = lazy(() => import('../pages/account-reports/AccountReports'));
const BalUpload = lazy(() => import('../pages/bal-upload/BalUpload'));
const PartyWiseLedger = lazy(() => import('../pages/party-wise-ledger/PartyWiseLedger'));
const LedgerWiseReport = lazy(() => import('../pages/ledger-wise-report/LedgerWiseReport'));
const SummarizedLedger = lazy(() => import('../pages/summarized-ledger/SummarizedLedger'));
const ReceiptsPayments = lazy(() => import('../pages/receipts-payments/ReceiptsPayments'));
const TrialBalanceReports = lazy(() => import('../pages/trial-balance-reports/TrialBalanceReports'));
const Income = lazy(() => import('../pages/income/Income'));
const CreditorAgeing = lazy(() => import('../pages/creditor-ageing/CreditorAgeing'));
const DebtorAgeing = lazy(() => import('../pages/debtor-ageing/DebtorAgeing'));
const AssetRegister = lazy(() => import('../pages/asset-register/AssetRegister'));
const InvestmentReport = lazy(() => import('../pages/investment-report/InvestmentReport'));
const GLListReport = lazy(() => import('../pages/gl-list-report/GLListReport'));
const AccountDocReport = lazy(() => import('../pages/account-doc-report/AccountDocReport'));
const MISReport = lazy(() => import('../pages/mis-report/MISReport'));
const PrintMiscReceipt = lazy(() => import('../pages/print-misc-receipt/PrintMiscReceipt'));
const PrintMembershipReceipt = lazy(() => import('../pages/print-membership-receipt/PrintMembershipReceipt'));
const BankDepositStatement = lazy(() => import('../pages/bank-deposit-statement/BankDepositStatement'));
const JournalBook = lazy(() => import('../pages/journal-book/JournalBook'));
const GSTInvoiceReport = lazy(() => import('../pages/gst-invoice-report/GSTInvoiceReport'));
const HSNSummaryReport = lazy(() => import('../pages/hsn-summary-report/HSNSummaryReport'));
// const Income = lazy(() => import('../pages/income/Income'));
// const Income = lazy(() => import('../pages/income/Income'));

// const Incom = lazy(() => import('../pages/ledger-wise-report/LedgerWiseReport'));
// const SummarizedLedger = lazy(() => import('../pages/summarized-ledger/SummarizedLedger'));



const Membership = lazy(() => import('../pages/membership/Membership'));

const AccountMaster = lazy(() => import('../pages/account-master/AccountMaster'));
const MembershipMaster = lazy(() => import('../pages/membership-master/MembershipMaster'));
const MaterialManagement = lazy(() => import('../pages/material-management/MaterialManagement'));
const ActionWiseReport = lazy(() => import('../pages/action-wise-report/ActionWiseReport'));
const DateWiseReport = lazy(() => import('../pages/date-wise-report/DateWiseReport'));
const HistoricalStock = lazy(() => import('../pages/historical-stock/HistoricalStock'));
const HistoricalStock1 = lazy(() => import('../pages/historical-stock1/HistoricalStock1'));
const Stock = lazy(() => import('../pages/stock/Stock'));
const PrintReceipt = lazy(() => import('../pages/print-receipt/PrintReceipt'));
// const MaterialManagement = lazy(() => import('../pages/material-management/MaterialManagement'));


const PublicationMaster = lazy(() => import('../pages/publication-master/PublicationMaster'));
const Publication = lazy(() => import('../pages/publication/Publication'));
const ActivityReports = lazy(() => import('../pages/activity-reports/ActivityReports'));
const MemberWiseActivity = lazy(() => import('../pages/member-wise-activity/MemberWiseActivity'));
const IssueWiseAdvertisement = lazy(() => import('../pages/issuewise-advertisement/IssueWiseAdvertisement'));
const ActiveSubscriber = lazy(() => import('../pages/active-subscriber/ActiveSubscriber'));
const MonthWiseAddressLabel = lazy(() => import('../pages/Demo/MonthWiseAddressLabel'));
const AdvertiserReport = lazy(() => import('../pages/advertiser-report/AdvertiserReport'));
const EmailMemo = lazy(() => import('../pages/email-memo/EmailMemo'));
const ConfirmationPrint = lazy(() => import('../pages/confirmation-print/ConfirmationPrint'));
const MemberCardPrint = lazy(() => import('../pages/member-card-print/MemberCardPrint'));
const IndustryMemberCard = lazy(() => import('../pages/industry-member-card/IndustryMemberCard'));
const MemberBill = lazy(() => import('../pages/member-bill/MemberBill'));
const MemStrDtWise = lazy(() => import('../pages/mem-str-dt-wise/MemStrDtWise'));
const MembershipSubscription = lazy(() => import('../pages/membership-subscription/MembershipSubscription'));
const MembersList = lazy(() => import('../pages/members-list/MembersList'));
const MembershipAddress = lazy(() => import('../pages/membership-address/MembershipAddress'));
const MembershipAddress2 = lazy(() => import('../pages/membership-address2/MembershipAddress2'));
const AdvMembership = lazy(() => import('../pages/adv-membership/AdvMembership'));
const AsOnDateReport = lazy(() => import('../pages/as-on-date-report/AsOnDateReport'));
const EasyPay = lazy(() => import('../pages/easy-pay/EasyPay'));
const ExaminationReports = lazy(() => import('../pages/examination-reports/ExaminationReports'));
const StudentReport = lazy(() => import('../pages/student-report/StudentReport'));
const SubjectWiseRegistered = lazy(() => import('../pages/subject-wise-registered/SubjectWiseRegistered'));
// const EmailMemo = lazy(() => import('../pages/email-memo/EmailMemo'));
// const EmailMemo = lazy(() => import('../pages/email-memo/EmailMemo'));
// const EmailMemo = lazy(() => import('../pages/email-memo/EmailMemo'));
// const EmailMemo = lazy(() => import('../pages/email-memo/EmailMemo'));
// const EmailMemo = lazy(() => import('../pages/email-memo/EmailMemo'));
// const EmailMemo = lazy(() => import('../pages/email-memo/EmailMemo'));
// const EmailMemo = lazy(() => import('../pages/email-memo/EmailMemo'));
// const EmailMemo = lazy(() => import('../pages/email-memo/EmailMemo'));
// const EmailMemo = lazy(() => import('../pages/email-memo/EmailMemo'));


const MembershipFee= lazy(() => import('../pages/membership-fee/MembershipFee'));
const NewMember = lazy(() => import('../pages/new-member/NewMember'));
const IndustryMember = lazy(() => import('../pages/industry-member/IndustryMember'));
const MembershipStrength = lazy(() => import('../pages/membership-strength/Membershipstrength'));
const MembershipDetails = lazy(() => import('../pages/membership-details/MembershipDetails'));
const SearchMember = lazy(() => import('../pages/search-member/SearchMember'));
const MembershipRepresentative = lazy(() => import('../pages/membership-representative/MembershipRepresentative'));
const LoyaltyCoupon = lazy(() => import('../pages/loyalty-coupon/LoyaltyCoupon'));

// ⚠️ Make sure these exist
const SearchStudent = lazy(() => import('../pages/search-student/SearchStudent'));
const ConfirmationLetter = lazy(() => import('../pages/confirmation-letter/ConfirmationLetter'));
const AdmitCard = lazy(() => import('../pages/admit-card/AdmitCard'));
const ExamProgram = lazy(() => import('../pages/exam-program/ExamProgram'));
const MarksEntry = lazy(() => import('../pages/mark-entry/MarksEntry'));
const Result = lazy(() => import('../pages/result/Result'));

// Pages configuration
export const pagesConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'bx bx-home-alt',
    path: '/',
    isPrivate: true,
    component: Dashboard
  },
  /////////////
// {
//     id: 'master',
//     title: 'Master',
//     // icon: 'bx bx-group',
//     icon: 'bx bx-id-card icon-membership',
//     path: '/master',
//     children: [
//        { id: 'account-master', title: 'Account Master', icon: 'bx bx-radio-circle', path: '/master/account-master', component: AccountMaster ,children: [
//         { id: 'membership-fee', title: 'Membership Fee', icon: 'bx bx-radio-circle', path: '/master/membership-master/membershipfee', component: MembershipFee, isPrivate: true }, 
//       ]},
//       { id: 'membership-master', title: 'Membership Master', icon: 'bx bx-radio-circle', path: '/master/membership-master', component: MembershipMaster ,children: [
//         { id: 'membership-fee', title: 'Membership Fee', icon: 'bx bx-radio-circle', path: '/master/membership-master/membershipfee', component: MembershipFee, isPrivate: true }, 
//       ]},
//        { id: 'material-management', title: 'Material Management', icon: 'bx bx-radio-circle', path: '/master/material-management', component: MaterialManagement ,children: [
//         { id: 'membership-fee', title: 'Membership Fee', icon: 'bx bx-radio-circle', path: '/master/membership-master/membershipfee', component: MembershipFee, isPrivate: true }, 
//       ]},
//       { id: 'publication-master', title: 'Publication Master', icon: 'bx bx-radio-circle', path: '/master/publication-master', component: PublicationMaster ,children: [
//         { id: 'membership-fee', title: 'Membership Fee', icon: 'bx bx-radio-circle', path: '/master/membership-master/membershipfee', component: MembershipFee, isPrivate: true }, 
//       ]},
//       // { id: 'publication', title: 'Publication', icon: 'bx bx-radio-circle', path: '/reports/publication', component: Publication,children: [
//         // { id: 'issueWise-advertisement', title: 'issueWise advertisement', icon: 'bx bx-radio-circle', path: '/reports/publication/issueWise-advertisement', component: IssueWiseAdvertisement, isPrivate: true },
//       //   { id: 'active-subcriber', title: 'Active Subscriber', icon: 'bx bx-radio-circle', path: '/reports/publication/active-subscriber', component: ActiveSubscriber, isPrivate: true },
//       //   { id: 'monthwise-addresslabel', title: 'Publication', icon: 'bx bx-radio-circle', path: '/reports/publication/monthwise-addresslabel', component: MonthWiseAddressLabel, isPrivate: true },
//       //   { id: 'advertiser-report', title: 'advertiser report', icon: 'bx bx-radio-circle', path: '/reports/publication/advertiser-report', component: AdvertiserReport, isPrivate: true }
//       // ] }
//       /////
//     ]
//   },

  ///////////
  {
    id: 'membership-management',
    title: 'Membership Management',
    // icon: 'bx bx-group',
    icon: 'bx bx-id-card icon-membership',
    path: '/membership-management',
    children: [
      { id: 'edit-member', title: 'Edit Member', icon: 'bx bx-radio-circle', path: '/membership-management/edit-member', component: EditMember, isPrivate: true, },
      { id: 'cancel-membership', title: 'Cancel Membership', icon: 'bx bx-radio-circle', path: '/membership-management/cancel-membership', component: CancelMemberShip, isPrivate: true, },
      { id: 'Edit-ind-Member', title: 'Edit ind Member', icon: 'bx bx-radio-circle', path: '/membership-management/edit-ind-member', component: EditindMember, isPrivate: true, }
    ]
  },

  {
    id: 'examination-management',
    title: 'Examination Management',
    // icon: 'bx bx-cube-alt',
    // icon: 'bx bx-book',
    icon: 'bx bx-book-open icon-exam',
    path: '/examination-management',
    children: [
      { id: 'exiting-student', title: 'Exiting Student', icon: 'bx bx-radio-circle', path: '/examination-management/exiting-student', component: ExitingStudent, isPrivate: true },
      { id: 'exam-program', title: 'Exam Program', icon: 'bx bx-radio-circle', path: '/examination-manage ment/exam-program', component: ExamProgram, isPrivate: true },
      { id: 'search-student', title: 'Search Student', icon: 'bx bx-radio-circle', path: '/examination-management/search-student', component: SearchStudent, isPrivate: true },
      { id: 'confirmation-letter', title: 'Confirmation Letter', icon: 'bx bx-radio-circle', path: '/examination-management/confirmation-letter', component: ConfirmationLetter, isPrivate: true },
      { id: 'admit-card', title: 'Admit Card', icon: 'bx bx-radio-circle', path: '/examination-management/admit-card', component: AdmitCard, isPrivate: true },
      { id: 'marks-entry', title: 'Marks Entry', icon: 'bx bx-radio-circle', path: '/examination-management/marks-entry', component: MarksEntry, isPrivate: true },
      { id: 'result', title: 'Result', icon: 'bx bx-radio-circle', path: '/examination-management/result', component: Result, isPrivate: true }
    ]
  },

  {
    id: 'account-management',
    title: 'Account Management',
    // icon: 'bx bx-cube-alt',
    //  icon: 'bx bx-wallet',
    icon: 'bx bx-wallet icon-account',
  // icon: 'bx bx-rupee icon-account',
    path: '/account-management',
    children: [
      { id: 'payment-receive', title: 'Payment Receive', icon: 'bx bx-radio-circle', path: '/account-management/payment-receive', component: PaymentReceive, isPrivate: true },
      // { id: 'payment-receive-edit', title: 'Payment Receive Edit', icon: 'bx bx-radio-circle', path: '/account-management/payment-receive-edit', component: PaymentReceiveEdit, isPrivate: true },
      { id: 'payment-process', title: 'Payment Process', icon: 'bx bx-radio-circle', path: '/account-management/payment-process', component: PaymentProcess, isPrivate: true },
      // { id: 'payment-process-new', title: 'Payment Process New', icon: 'bx bx-radio-circle', path: '/account-management/payment-process-new', component: PaymentProcessNew, isPrivate: true },
      { id: 'modify-receipt', title: 'Modify Receipt', icon: 'bx bx-radio-circle', path: '/account-management/modify-receipt', component: ModifyReceipt, isPrivate: true },
      { id: 'performance-invoice', title: 'Performance Invoice', icon: 'bx bx-radio-circle', path: '/account-management/performance-invoice', component: PerformanceInvoice, isPrivate: true }
    ]
  },

  {
    id: 'publication-management',
    title: 'Publication Management',
    // icon: 'bx bx-cube-alt',
    icon: 'bx bx-book-content icon-publication',
    path: '/publication-management',
    children: [
      { id: 'postal-registration', title: 'Postal Registration', icon: 'bx bx-radio-circle', path: '/publication-management/postal-registration', component: PostalRegistration, isPrivate: true },
      { id: 'generate-issue', title: 'Generate Issue', icon: 'bx bx-radio-circle', path: '/publication-management/generate-issue', component: GenerateIssue, isPrivate: true },
      { id: 'article-recording', title: 'Article Recording', icon: 'bx bx-radio-circle', path: '/publication-management/article-recording', component: ArticleRecording, isPrivate: true },
      { id: 'complimentry-recording', title: 'Complimentry Recording', icon: 'bx bx-radio-circle', path: '/publication-management/complimentry-recording', component: ComplimentryRecording, isPrivate: true },
      { id: 'performa-invoice', title: 'Performa Invoice', icon: 'bx bx-radio-circle', path: '/publication-management/performa-invoice', component: PerformaInvoice, isPrivate: true },
      { id: 'change-subscriptions-period', title: 'Change Subscriptions Period', icon: 'bx bx-radio-circle', path: '/publication-management/change-subscriptions-period', component: ChangeSubscriptionsPeriod, isPrivate: true, },
      { id: 'change-subscribers-period', title: 'Change Subscribers Period', icon: 'bx bx-radio-circle', path: '/publication-management/change-subscribers-period', component: ChangeSubscribersPeriod, isPrivate: true, },
      { id: 'email-invoice', title: 'Email Invoice', icon: 'bx bx-radio-circle', path: '/publication-management/emailinvoice', component: EmailInvoice, isPrivate: true, }
      

      // { id: 'performa-invoice', title: 'Performa Invoice', icon: 'bx bx-radio-circle', path: '/publication-management/performa-invoice', component: PerformaInvoice, isPrivate: true },
      // { id: 'generate-issue', title: 'Generate Issue', icon: 'bx bx-radio-circle', path: '/publication-management/generate-issue', component: GenerateIssue, isPrivate: true }
      // { id: 'generate-issue', title: 'Generate Issue', icon: 'bx bx-radio-circle', path: '/publication-management/generate-issue', component: GenerateIssue, isPrivate: true }
    ]
  },
  

  {
    id: 'reports',
    title: 'Reports',
    // icon: 'bx bx-cube-alt',
    icon: 'bx bx-bar-chart-alt-2 icon-reports',
    path: '/reports',
    children: [
      { id: 'account-reports', title: 'Account Reports', icon: 'bx bx-radio-circle', path: '/reports/account-reports', component: AccountReports,children: [
        { id: 'bal-upload', title: 'Bal Upload', icon: 'bx bx-radio-circle', path: '/reports/account-reports/bal-upload', component: BalUpload, isPrivate: true },
        { id: 'party-wise-ledger', title: 'Party Wise Ledger', icon: 'bx bx-radio-circle', path: '/reports/account-reports/party-wise-ledger', component: PartyWiseLedger, isPrivate: true },
        { id: 'ledger-wise-report', title: 'Ledger Wise Report', icon: 'bx bx-radio-circle', path: '/reports/account-reports/ledger-wise-report', component: LedgerWiseReport, isPrivate: true },
        { id: 'summarized-ledger', title: 'Summarized Ledger', icon: 'bx bx-radio-circle', path: '/reports/account-reports/summarized-ledger', component: SummarizedLedger, isPrivate: true },
        
        { id: 'receipt-payments', title: 'Receipts Payments', icon: 'bx bx-radio-circle', path: '/reports/account-reports/receipt-payments', component: ReceiptsPayments, isPrivate: true },
        { id: 'trial-balance-reports', title: 'Trial Balance Reports', icon: 'bx bx-radio-circle', path: '/reports/account-reports/trial-balance-reports', component: TrialBalanceReports, isPrivate: true },
        { id: 'income', title: 'Income &  Expenditure ', icon: 'bx bx-radio-circle', path: '/reports/account-reports/income', component: Income, isPrivate: true },
        
        { id: 'creditor-ageing', title: 'Creditor Ageing', icon: 'bx bx-radio-circle', path: '/reports/account-reports/creditor-ageing', component: CreditorAgeing, isPrivate: true },
        { id: 'debtor-ageing', title: 'Debtor Ageing', icon: 'bx bx-radio-circle', path: '/reports/account-reports/debtor-ageing', component: DebtorAgeing, isPrivate: true },
        { id: 'asset-register', title: 'AssetRegister ', icon: 'bx bx-radio-circle', path: '/reports/account-reports/asset-register', component: AssetRegister, isPrivate: true },
        
        { id: 'investment-report', title: 'Investment Report', icon: 'bx bx-radio-circle', path: '/reports/account-reports/investment-report', component: InvestmentReport, isPrivate: true },
        { id: 'gl-list-report', title: 'GL List Report', icon: 'bx bx-radio-circle', path: '/reports/account-reports/gl-list-report', component: GLListReport, isPrivate: true },
        { id: 'account-doc-report', title: 'Account Doc Report', icon: 'bx bx-radio-circle', path: '/reports/account-reports/account-doc-report', component: AccountDocReport, isPrivate: true },

        { id: 'mis-report', title: 'MIS Report', icon: 'bx bx-radio-circle', path: '/reports/account-reports/mis-report', component: MISReport, isPrivate: true },
        { id: 'print-misc-receipt', title: 'Print Misc Receipt', icon: 'bx bx-radio-circle', path: '/reports/account-reports/print-misc-receipt', component: PrintMiscReceipt, isPrivate: true },
        { id: 'print-membership-receipt', title: 'Print Membership Receipt', icon: 'bx bx-radio-circle', path: '/reports/account-reports/print-membership-receipt', component: PrintMembershipReceipt, isPrivate: true },
        { id: 'bank-deposit-statement', title: 'Bank Deposit Statement', icon: 'bx bx-radio-circle', path: '/reports/account-reports/bank-deposit-statement', component: BankDepositStatement, isPrivate: true },

        { id: 'journal-book', title: 'Journal Book', icon: 'bx bx-radio-circle', path: '/reports/account-reports/journal-book', component: JournalBook, isPrivate: true },
        { id: 'gst-invoice-report', title: 'GST Invoice Report', icon: 'bx bx-radio-circle', path: '/reports/account-reports/gst-invoice-report', component: GSTInvoiceReport, isPrivate: true },
        { id: 'hsn-summary-report', title: 'HSN/SAC Summary Report', icon: 'bx bx-radio-circle', path: '/reports/account-reports/hsn-summary-report', component: HSNSummaryReport, isPrivate: true },
        
       
      ] },
      { id: 'membership', title: 'Membership', icon: 'bx bx-radio-circle', path: '/reports/membership', component: Membership ,children: [
        { id: 'emailmemo', title: 'Email Memo', icon: 'bx bx-radio-circle', path: '/reports/membership/emailmemo', component: EmailMemo, isPrivate: true },
        { id: 'newmember', title: 'New Member', icon: 'bx bx-radio-circle', path: '/reports/membership/newmember', component: NewMember, isPrivate: true },
        { id: 'industrymember', title: 'Industry Member Bill', icon: 'bx bx-radio-circle', path: '/reports/membership/industrymember', component: IndustryMember, isPrivate: true },
        { id: 'membershipstrength', title: 'Membership Strength', icon: 'bx bx-radio-circle', path: '/reports/membership/membershipstrength', component: MembershipStrength, isPrivate: true },
        { id: 'membershipdetails', title: 'Membership Details', icon: 'bx bx-radio-circle', path: '/reports/membership/membershipdetails', component: MembershipDetails, isPrivate: true },
        { id: 'searchmember', title: 'Search Member', icon: 'bx bx-radio-circle', path: '/reports/membership/searchmember', component: SearchMember, isPrivate: true },
        { id: 'membershiprepresentative', title: 'Membership Representative', icon: 'bx bx-radio-circle', path: '/reports/membership/membershiprepresentative', component: MembershipRepresentative, isPrivate: true },
        { id: 'loyaltycoupon', title: 'Loyalty Coupon', icon: 'bx bx-radio-circle', path: '/reports/membership/loyaltycoupon', component: LoyaltyCoupon, isPrivate: true },

        { id: 'confirmation-print', title: 'Confirmation Print', icon: 'bx bx-radio-circle', path: '/reports/membership/confirmation-print', component: ConfirmationPrint, isPrivate: true },
        { id: 'member-card-print', title: 'Member Card Print', icon: 'bx bx-radio-circle', path: '/reports/membership/member-card-print', component: MemberCardPrint, isPrivate: true },
        { id: 'industry-member-card', title: 'Industry Member Card Print', icon: 'bx bx-radio-circle', path: '/reports/membership/industry-member-card', component: IndustryMemberCard, isPrivate: true },
        { id: 'member-bill', title: 'Member Bill', icon: 'bx bx-radio-circle', path: '/reports/membership/member-bill', component: MemberBill, isPrivate: true },
        { id: 'mem-str-dt-wise', title: 'Mem Str. Dt wise', icon: 'bx bx-radio-circle', path: '/reports/membership/mem-str-dt-wise', component: MemStrDtWise, isPrivate: true },
        { id: 'membership-subscription', title: 'Membership Subscription', icon: 'bx bx-radio-circle', path: '/reports/membership/membership-subscription', component: MembershipSubscription, isPrivate: true },
        { id: 'members-list', title: 'Members List', icon: 'bx bx-radio-circle', path: '/reports/membership/members-list', component: MembersList, isPrivate: true },
        { id: 'membership-address', title: 'Membership Address', icon: 'bx bx-radio-circle', path: '/reports/membership/membership-address', component: MembershipAddress, isPrivate: true },
        { id: 'membership-address2', title: 'Membership Address2', icon: 'bx bx-radio-circle', path: '/reports/membership/membership-address2', component: MembershipAddress2, isPrivate: true },
        { id: 'adv-membership', title: 'Advance Membership Report', icon: 'bx bx-radio-circle', path: '/reports/membership/adv-membership', component: AdvMembership, isPrivate: true },
        { id: 'as-on-date-report', title: 'As On Date Report', icon: 'bx bx-radio-circle', path: '/reports/membership/as-on-date-report', component: AsOnDateReport, isPrivate: true },
        { id: 'easy-pay', title: 'Easy Pay', icon: 'bx bx-radio-circle', path: '/reports/membership/easy-pay', component: EasyPay, isPrivate: true },
      
      ]},

       { id: 'activity-reports', title: 'Activity Reports', icon: 'bx bx-radio-circle', path: '/reports/activity-reports', component: ActivityReports,children: [
        { id: 'member-Wise-activity', title: 'Member Wise Activity Reports', icon: 'bx bx-radio-circle', path: '/reports/activity-reports/member-Wise-activity', component: MemberWiseActivity, isPrivate: true },
      ] },

        { id: 'material-management', title: 'Material Management', icon: 'bx bx-radio-circle', path: '/reports/material-management', component: MaterialManagement,children: [
        { id: 'action-wise-report', title: ' Action Wise Report', icon: 'bx bx-radio-circle', path: '/reports/material-management/action-wise-report', component: ActionWiseReport, isPrivate: true },
        { id: 'date-wise-report', title: ' Date Wise Report', icon: 'bx bx-radio-circle', path: '/reports/material-management/date-wise-report', component: DateWiseReport, isPrivate: true },
        { id: 'historical-stock', title: ' Historical Stock Report', icon: 'bx bx-radio-circle', path: '/reports/material-management/historical-stock', component: HistoricalStock, isPrivate: true },
        { id: 'historical-stock1', title: ' Historical Stock Report1', icon: 'bx bx-radio-circle', path: '/reports/material-management/historical-stock1', component: HistoricalStock1, isPrivate: true },
        { id: 'stock', title: 'Stock & Cost Report', icon: 'bx bx-radio-circle', path: '/reports/material-management/stock', component: Stock, isPrivate: true },
        { id: 'print-receipt', title: 'Print Receipt', icon: 'bx bx-radio-circle', path: '/reports/material-management/print-receipt', component: PrintReceipt, isPrivate: true },
       
      ] },

        { id: 'examination-reports', title: 'Examination Reports', icon: 'bx bx-radio-circle', path: '/reports/examination-reports', component: ExaminationReports,children: [
        { id: 'student-report', title: 'Student Report', icon: 'bx bx-radio-circle', path: '/reports/examination-reports/student-report', component: StudentReport, isPrivate: true },
        { id: 'subject-wise-registered', title: 'Subject Wise Registered ', icon: 'bx bx-radio-circle', path: '/reports/examination-reports/subject-wise-registered', component: SubjectWiseRegistered, isPrivate: true },
      ] },

      { id: 'publication', title: 'Publication', icon: 'bx bx-radio-circle', path: '/reports/publication', component: Publication,children: [
        { id: 'issueWise-advertisement', title: 'issueWise advertisement', icon: 'bx bx-radio-circle', path: '/reports/publication/issueWise-advertisement', component: IssueWiseAdvertisement, isPrivate: true },
        { id: 'active-subcriber', title: 'Active Subscriber', icon: 'bx bx-radio-circle', path: '/reports/publication/active-subscriber', component: ActiveSubscriber, isPrivate: true },
        { id: 'monthwise-addresslabel', title: 'Publication', icon: 'bx bx-radio-circle', path: '/reports/publication/monthwise-addresslabel', component: MonthWiseAddressLabel, isPrivate: true },
        { id: 'advertiser-report', title: 'advertiser report', icon: 'bx bx-radio-circle', path: '/reports/publication/advertiser-report', component: AdvertiserReport, isPrivate: true }
      ] },


    ]
  },
  {
    id: 'user-management',
    title: 'User Management',
    // icon: 'bx bx-group',
    icon: 'bx bx-user-circle icon-user',
    path: '/user-management',
    children: [
      {
        id: 'user-roles',
        title: 'User Roles',
        icon: 'bx bx-radio-circle',
        path: '/user-management/user-roles',
        component: UserRoles,
        children: [
          {
            id: 'access-control',
            title: 'Access Control',
            icon: 'bx bx-radio-circle',
            path: '/user-management/user-roles/access-control',
            component: AccessControl,
            isPrivate: true,
          }
        ]
      },
      {
        id: 'user-profile',
        title: 'User Profile',
        icon: 'bx bx-radio-circle',
        path: '/user-management/user-profile',
        component: UserProfile,
        isPrivate: true,
      }
    ]
  },
]

// Auth pages
export const authPagesConfig = [
  { id: 'login', title: 'Login', path: '/login', component: Login, isPrivate: false },
  { id: 'forgot-password', title: 'Forgot Password', path: '/forgot-password', component: ForgotPassword, isPrivate: false }
]

export const allPagesConfig = [...pagesConfig, ...authPagesConfig]