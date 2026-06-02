import MainLayoutWrapper from "@/components/page-wrapper/MainLayoutWrapper";
import CommonTable from "@/components/ui/table/CommonTable";

const Dashboard = () => {
    
  const employees = [
    { name: "Amit Roy", dept: "Engineering", location: "Kolkata", status: "Active" },
    { name: "Priya Sharma", dept: "HR", location: "Bangalore", status: "Active" },
    { name: "Rahul Sen", dept: "Finance", location: "Pune", status: "Inactive" },
  ];

  
  const columns = [
    { key: "name", title: "Employee Name" },
    { key: "dept", title: "Department" },
    { key: "location", title: "Location" },
    {
      key: "status",
      title: "Status",
      render: (val) => (
        <span className={`badge text-bg-${val === "Active" ? "success" : "secondary"}`}>
          {val}
        </span>
      ),
    },
    {
        key: "actions",
        title: "Actions",
        render: (_, row) => (
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-primary">Edit</button>
            <button className="btn btn-sm btn-danger">Delete</button>
          </div>
        ),
    }
  ];


    return (
        <MainLayoutWrapper title="Dashboard">
                  
        <CommonTable
        //   title="Employee Table"
        //   subtitle="All employees"
            columns={columns}
            data={employees}
        />

        </MainLayoutWrapper>
    )
}

export default Dashboard;