import CustomerPanel from "@/components/routes/customers/customer-panel";
import DepartmentPanel from "@/components/routes/departments/department-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminPage = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <CustomerPanel />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Departments</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DepartmentPanel />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminPage;
