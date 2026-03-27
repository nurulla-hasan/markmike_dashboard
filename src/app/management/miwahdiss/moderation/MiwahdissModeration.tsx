import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Tag
} from "lucide-react";
import PageLayout from "@/components/common/page-layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MiwahdissModeration = () => {
    const navigate = useNavigate();

    const posts = [1, 2, 3, 4].map((i) => ({
        id: String(i),
        userName: "Nm Sujon",
        userAvatar: "https://github.com/shadcn.png",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=60",
        description: "Amazing Jamaica Independence Day celebration with family! 🇯🇲",
        tag: "Independence Day"
    }));

    return (
        <PageLayout>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => navigate(-1)}
                        className="h-10 w-10 text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="text-2xl font-bold text-foreground">Community moderation</h1>
                </div>
                <Select defaultValue="all">
                    <SelectTrigger className="w-45 bg-muted/20 border-none">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {posts.map((post) => (
                    <Card key={post.id}>
                        <CardContent className="space-y-4">
                            {/* Post Image */}
                            <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                                <img src={post.image} alt="" className="w-full h-full object-cover" />
                            </div>

                            {/* User Info */}
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={post.userAvatar} />
                                    <AvatarFallback>NS</AvatarFallback>
                                </Avatar>
                                <span className="font-bold text-foreground">{post.userName}</span>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {post.description}
                            </p>

                            {/* Tag */}
                            <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50/50 flex items-center gap-1.5 w-fit">
                                <Tag className="h-3 w-3" />
                                {post.tag}
                            </Badge>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/5 font-bold">
                                    Reject
                                </Button>
                                <Button className="bg-destructive hover:bg-destructive/90 text-white font-bold">
                                    Approve
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </PageLayout>
    );
};

export default MiwahdissModeration;
