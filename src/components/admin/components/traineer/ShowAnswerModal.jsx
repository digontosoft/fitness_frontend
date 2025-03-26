import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useEffect, useState } from "react";

function ShowAnswerModal({ userId, onclose }) {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/userDetails/${userId}`);
        setUserInfo(response.data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, [userId]);

  return (
    <Dialog open={true} onOpenChange={onclose}>
      <DialogTrigger asChild>
        <DialogContent className="max-w-4xl mx-auto w-[90%] h-[80%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] overflow-y-scroll">
          <DialogHeader>kjfjfgoikyihkip</DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                className="w-full justify-center bg-customBg"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogTrigger>
    </Dialog>
  );
}

export default ShowAnswerModal;
