"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "@/lib/features/financeSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CiCalendarDate } from "react-icons/ci";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import EmojiPicker from "emoji-picker-react";

export function AddRevenue() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.finance.categories);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("💰");
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState(categories[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setDate(new Date());
    setIsClient(true);
  }, []);

  const handleEmojiSelect = (emojiData) => {
    setEmoji(emojiData.emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && description && category) {
      dispatch(
        addTransaction({
          id: Date.now().toString(),
          type: "revenue", // Gelir türü
          amount: parseFloat(amount),
          description: `${emoji} ${description}`,
          date: date.toISOString(),
          category,
        })
      );
      setAmount("");
      setDescription("");
      setEmoji("💰");
      setDate(new Date());
      setCategory(categories[0]);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <div className="relative">
              <Input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
                className="w-full pr-10"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="absolute right-0  top-1/2 transform -translate-y-1/2"
                  >
                    {emoji}
                  </Button>
                </PopoverTrigger>
                {isClient && (
                  <PopoverContent className="w-auto p-0">
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                  </PopoverContent>
                )}
              </Popover>
            </div>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CiCalendarDate className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button type="submit" className="w-full">
            Add Revenue
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        Ensure all fields are filled correctly.
      </CardFooter>
    </Card>
  );
}
