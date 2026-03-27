import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    // ArrowLeft,
    Megaphone,
    Copy,
    Users,
    Ticket,
    ShoppingBag,
    TrendingUp
} from "lucide-react";
import PageLayout from "@/components/common/page-layout";
import { Card, CardContent } from "@/components/ui/card";

const CampaignView = () => {
    const { id } = useParams();
    // const navigate = useNavigate();

    // const handleBack = () => {
    //     navigate(-1);
    // };

    return (
        <PageLayout>
            {/* Top Back Button */}
            {/* <div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    className="h-10 w-10 text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>
            </div> */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Campaign Details (Span 2) */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="space-y-6">
                            {/* Header Info */}
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                                    <Megaphone className="h-6 w-6" />
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-2xl font-bold text-foreground">Campaign -0{id || 1}</h1>
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-green-500" />
                                        <span className="text-sm font-medium text-green-500">Active Campaign</span>
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <span className="text-sm text-muted-foreground font-medium">Start Date</span>
                                        <p className="text-base font-semibold text-foreground">25-02-2026</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm text-muted-foreground font-medium">End Date</span>
                                        <p className="text-base font-semibold text-foreground">25-02-2026</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm text-muted-foreground font-medium">Campaign Type</span>
                                        <p className="text-base font-semibold text-foreground">General Discount</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm text-muted-foreground font-medium">Fixed</span>
                                        <p className="text-base font-semibold text-foreground">General Discount</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm text-muted-foreground font-medium">Restricted Branch</span>
                                        <p className="text-base font-semibold text-foreground">Mont ego</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <span className="text-sm text-muted-foreground font-medium">Restricted Category</span>
                                        <Badge variant="secondary" className="bg-muted text-muted-foreground font-medium">T-shirt</Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm text-muted-foreground font-medium">Restricted Product</span>
                                        <p className="text-base font-semibold text-foreground">T-shirt , Sweet shirt</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm text-muted-foreground font-medium">Usage Limit</span>
                                        <p className="text-base font-semibold text-foreground">200</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm text-muted-foreground font-medium">Usage Per Customer</span>
                                        <p className="text-base font-semibold text-foreground">1</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm text-muted-foreground font-medium">Discount Value</span>
                                        <p className="text-lg font-bold text-foreground">$150.00</p>
                                    </div>
                                </div>
                            </div>

                            {/* Redemption Code Section */}
                            <div className="bg-destructive/5 border border-destructive/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <span className="text-sm text-destructive/80 font-medium">Redemption code</span>
                                    <h2 className="text-2xl font-bold text-destructive">Summersale-26</h2>
                                </div>
                                <Button
                                    variant="outline"
                                    className="bg-white border-none shadow-sm hover:bg-muted text-foreground font-semibold flex items-center gap-2 px-6 h-12 rounded-xl"
                                >
                                    <Copy className="h-5 w-5" />
                                    Copy
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Summaries (Span 1) */}
                <div className="space-y-8">
                    {/* Usage Summary */}
                    <Card>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive">
                                    <Users className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground">Usage Summary</h3>
                            </div>

                            <div className="flex items-center justify-center py-4 relative">
                                {/* Circular Progress Placeholder */}
                                <div className="h-32 w-32 rounded-full border-8 border-muted flex items-center justify-center relative">
                                    <div className="absolute inset-0 rounded-full border-8 border-destructive border-t-transparent -rotate-45" />
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-foreground">20</p>
                                        <p className="text-xs text-muted-foreground">User</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="h-1 bg-muted rounded-full relative overflow-hidden">
                                    <div className="absolute inset-y-0 left-0 bg-destructive w-[10%]" />
                                </div>
                                <div className="flex justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground font-medium">Remaining</p>
                                        <p className="text-xl font-bold text-foreground">180</p>
                                        <p className="text-xs text-muted-foreground">user</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-sm text-muted-foreground font-medium">Max allowed</p>
                                        <p className="text-xl font-bold text-foreground">20</p>
                                        <p className="text-xs text-muted-foreground">user</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Revenue Summary */}
                    <Card>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive">
                                        <Ticket className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground">Revenue Summery</h3>
                                </div>
                                <div className="flex items-center gap-1 text-green-500 font-semibold">
                                    <TrendingUp className="h-4 w-4" />
                                    <span className="text-sm">+12.5%</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground font-medium">Total revenue generated</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-2xl font-bold text-foreground">$4500.00</p>
                                    <p className="text-sm text-muted-foreground font-bold">JMD</p>
                                </div>
                            </div>

                            <div className="bg-muted rounded-2xl p-4 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                                    <ShoppingBag className="h-6 w-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground font-medium">Orders Linked</p>
                                    <p className="text-2xl font-black text-foreground">45</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageLayout>
    );
};

export default CampaignView;
