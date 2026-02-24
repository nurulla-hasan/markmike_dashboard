import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";
import { Card, CardContent } from "@/components/ui/card";

const ContactUs = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Contact Us"
        description="View and manage contact inquiries from users"
      />
      <Card>
        <CardContent className="p-8">
          <p className="text-muted-foreground">Contact us management content will be here.</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ContactUs;
