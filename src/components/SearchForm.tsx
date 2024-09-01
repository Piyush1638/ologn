"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { places } from "@/lib/localityNames";
import Autocomplete from "./Autocomplete";

const SearchForm = () => {
  const router = useRouter();
  const [location, setLocation] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>("Search for a location");

  const filterSuggestions = (input: string) => {
    if (input.length > 0) {
      const filtered = places
        .map((place) => place.localityName)
        .filter((name) => name.toLowerCase().includes(input.toLowerCase()));
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const startRecognition = () => {
    if (recognition) {
      setPlaceholder("Listening...");
      recognition.start();
    } else {
      const newRecognition = initializeSpeechRecognition(setLocation, setPlaceholder);
      if (newRecognition) {
        setRecognition(newRecognition);
        setPlaceholder("Listening...");
        newRecognition.start();
      }
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setLocation(suggestion);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (recognition === null) {
      const newRecognition = initializeSpeechRecognition(setLocation, setPlaceholder);
      if (newRecognition) {
        setRecognition(newRecognition);
      }
    }
  }, [recognition]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (location) {
      router.push(`/search/${location}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative md:w-2/5 w-full">
      <div className="w-full pl-2 pr-4 py-1 bg-white border border-gray-500 rounded-full flex items-center gap-2">
        <CiSearch className="inline-block text-3xl" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full py-1 outline-none bg-transparent"
          onChange={(e) => {
            setLocation(e.target.value);
            filterSuggestions(e.target.value);
          }}
          value={location || ""}
        />
        {location && (
          <button
            type="button"
            onClick={() => setLocation(null)}
            className="text-2xl text-gray-600"
          >
            <RxCross2 />
          </button>
        )}
        <button
          type="button"
          onClick={startRecognition}
          className="text-3xl text-gray-600"
        >
          <Image src={"/home/mic.svg"} alt="..." height={28} width={20} />
        </button>
      </div>
      {showSuggestions && (
        <Autocomplete
          suggestions={suggestions}
          onSelect={handleSelectSuggestion}
        />
      )}
    </form>
  );
};

// Custom type definitions for SpeechRecognition and related events
interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResult[][];
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  new (): SpeechRecognition;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognition;
    webkitSpeechRecognition: SpeechRecognition;
  }
}

const initializeSpeechRecognition = (
  setLocation: (text: string) => void,
  setPlaceholder: (text: string) => void
): SpeechRecognition | null => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech Recognition API not supported in this browser.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript;
    setLocation(transcript);
    setPlaceholder("Search for a location");
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error("Speech recognition error", event.error);
    setPlaceholder("Search for a location");
  };

  return recognition;
};

export default SearchForm;
