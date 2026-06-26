import { Switch } from "@mui/material";

export default function ToggleSwitch({ checked, onChange }) {
  return <Switch checked={checked} onChange={onChange} />;
}
