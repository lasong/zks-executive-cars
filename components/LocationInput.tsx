"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, MapPin } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhotonFeature {
  properties: {
    name?: string;
    housenumber?: string;
    street?: string;
    district?: string;
    city?: string;
    postcode?: string;
    country?: string;
  };
}

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
}

// London-biased so nearby UK results rank first, without excluding other places.
const SEARCH_PARAMS = { lat: "51.5074", lon: "-0.1278", location_bias_scale: "0.4" };

function formatSuggestion(props: PhotonFeature["properties"]): string {
  const street = [props.housenumber, props.street].filter(Boolean).join(" ");
  const parts: string[] = [];

  for (const part of [props.name, street, props.city ?? props.district, props.postcode, props.country]) {
    if (part && !parts.includes(part)) parts.push(part);
  }

  return parts.join(", ");
}

export default function LocationInput({ value, onChange, onBlur, placeholder, error }: LocationInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function fetchSuggestions(query: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 3) {
      setIsLoading(false);
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const requestId = ++requestIdRef.current;
      setIsLoading(true);
      try {
        const params = new URLSearchParams({ q: query, limit: "5", lang: "en", ...SEARCH_PARAMS });
        const res = await fetch(`https://photon.komoot.io/api/?${params.toString()}`);
        const data: { features: PhotonFeature[] } = await res.json();
        if (requestId !== requestIdRef.current) return;

        const labels = [...new Set(data.features.map((feature) => formatSuggestion(feature.properties)))].filter(
          Boolean
        );
        setSuggestions(labels);
        setIsOpen(labels.length > 0);
        setHighlightedIndex(-1);
      } catch {
        if (requestId === requestIdRef.current) setSuggestions([]);
      } finally {
        if (requestId === requestIdRef.current) setIsLoading(false);
      }
    }, 350);
  }

  function selectSuggestion(label: string) {
    onChange(label);
    setSuggestions([]);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((index) => (index - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault();
      selectSuggestion(suggestions[highlightedIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            fetchSuggestions(event.target.value);
          }}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          className={cn("pl-9 pr-9", error && "border-destructive")}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-border bg-card shadow-lg"
        >
          {suggestions.map((label, index) => (
            <li key={label} role="option" aria-selected={index === highlightedIndex}>
              <button
                type="button"
                onClick={() => selectSuggestion(label)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  "flex w-full items-start gap-2 px-3 py-2 text-left text-sm transition-colors",
                  index === highlightedIndex ? "bg-secondary" : "hover:bg-secondary"
                )}
              >
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gold" />
                <span className="text-foreground">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}
