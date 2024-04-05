import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilteringArea = () => {
  return (
    <div className="flex gap-2">
      <Select>
        <SelectTrigger className="w-[100px] focus:ring-0">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent className="outline-none ring-0">
          <SelectGroup className="outline-none ring-0">
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[100px] focus:ring-0">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="outline-none ring-0">
          <SelectGroup className="outline-none ring-0">
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button variant="ghost">Open Now</Button>
      <Button variant="ghost">Top Rated</Button>
      <Button variant="ghost">Quick Response</Button>
      <Button variant="ghost">JD Verified</Button>
      <Button variant="ghost">Ratings</Button>
      <Button variant="ghost">JD Trust</Button>
      <Button variant="ghost">All Filters</Button>
    </div>
  );
};
export default FilteringArea;
