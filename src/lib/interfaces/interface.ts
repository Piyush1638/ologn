
// Interface for Weather Info component props
export interface WeatherInfoProps {
    iconSrc: string;
    value: string;
    label: string;
  }
  
  // Interface for Autocomplete component props
  export interface AutocompleteProps {
    suggestions: string[];
    onSelect: (suggestion: string) => void;
  }
  