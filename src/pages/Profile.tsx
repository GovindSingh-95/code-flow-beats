
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogOut, User, Settings, HelpCircle, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layouts/MainLayout";

export default function Profile() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate("/");
  };

  return (
    <MainLayout>
      <div className="p-6 pb-24">
        <h1 className="text-2xl font-semibold mb-6">Profile</h1>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-lg font-medium">John Doe</h2>
                <p className="text-sm text-muted-foreground">john.doe@example.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <MenuItem icon={<User size={18} />} label="Account Settings" />
              <Separator />
              <MenuItem icon={<Bell size={18} />} label="Notifications" />
              <Separator />
              <MenuItem 
                icon={<div className="flex items-center">
                  Theme
                  <div className="ml-auto">
                    <ThemeToggle />
                  </div>
                </div>} 
                noArrow
              />
              <Separator />
              <MenuItem icon={<HelpCircle size={18} />} label="Help & Support" />
            </CardContent>
          </Card>

          <Button 
            variant="destructive" 
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label?: string;
  noArrow?: boolean;
}

function MenuItem({ icon, label, noArrow = false }: MenuItemProps) {
  return (
    <div className="flex items-center px-4 py-3 cursor-pointer hover:bg-secondary/50">
      <div className="text-muted-foreground mr-3">
        {typeof icon === 'string' ? <span>{icon}</span> : icon}
      </div>
      {label && <span>{label}</span>}
      {!noArrow && (
        <div className="ml-auto text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      )}
    </div>
  );
}
