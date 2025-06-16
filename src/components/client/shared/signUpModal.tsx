import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
function SignUpModal() {
  const countryCodes = [
    "AF",
    "AL",
    "DZ",
    "AD",
    "AO",
    "AG",
    "AR",
    "AM",
    "AU",
    "AT",
    "AZ",
    "BS",
    "BH",
    "BD",
    "BB",
    "BY",
    "BE",
    "BZ",
    "BJ",
    "BT",
    "BO",
    "BA",
    "BW",
    "BR",
    "BN",
    "BG",
    "BF",
    "BI",
    "CV",
    "KH",
    "CM",
    "CA",
    "CF",
    "TD",
    "CL",
    "CN",
    "CO",
    "KM",
    "CD",
    "CG",
    "CR",
    "CI",
    "HR",
    "CU",
    "CY",
    "CZ",
    "DK",
    "DJ",
    "DM",
    "DO",
    "TL",
    "EC",
    "EG",
    "SV",
    "GQ",
    "ER",
    "EE",
    "SZ",
    "ET",
    "FJ",
    "FI",
    "FR",
    "GA",
    "GM",
    "GE",
    "DE",
    "GH",
    "GR",
    "GD",
    "GT",
    "GN",
    "GW",
    "GY",
    "HT",
    "HN",
    "HU",
    "IS",
    "IN",
    "ID",
    "IR",
    "IQ",
    "IE",
    "IL",
    "IT",
    "JM",
    "JP",
    "JO",
    "KZ",
    "KE",
    "KI",
    "KP",
    "KR",
    "XK",
    "KW",
    "KG",
    "LA",
    "LV",
    "LB",
    "LS",
    "LR",
    "LY",
    "LI",
    "LT",
    "LU",
    "MG",
    "MW",
    "MY",
    "MV",
    "ML",
    "MT",
    "MH",
    "MR",
    "MU",
    "MX",
    "FM",
    "MD",
    "MC",
    "MN",
    "ME",
    "MA",
    "MZ",
    "MM",
    "NA",
    "NR",
    "NP",
    "NL",
    "NZ",
    "NI",
    "NE",
    "NG",
    "MK",
    "NO",
    "OM",
    "PK",
    "PW",
    "PA",
    "PG",
    "PY",
    "PE",
    "PH",
    "PL",
    "PT",
    "QA",
    "RO",
    "RU",
    "RW",
    "KN",
    "LC",
    "VC",
    "WS",
    "SM",
    "ST",
    "SA",
    "SN",
    "RS",
    "SC",
    "SL",
    "SG",
    "SK",
    "SI",
    "SB",
    "SO",
    "ZA",
    "ES",
    "LK",
    "SD",
    "SS",
    "SR",
    "SE",
    "CH",
    "SY",
    "TW",
    "TJ",
    "TZ",
    "TH",
    "TG",
    "TO",
    "TT",
    "TN",
    "TR",
    "TM",
    "TV",
    "UG",
    "UA",
    "AE",
    "GB",
    "US",
    "UY",
    "UZ",
    "VU",
    "VA",
    "VE",
    "VN",
    "YE",
    "ZM",
    "ZW",
  ];

  const countries = countryCodes.map((code) => ({
    value: code,
    label: new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code,
  }));
  const months = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(0, i))
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <>
      <div className="mx-5">
        <DialogContent className="overflow-auto boder rounded-lg max-w-[30rem] max-h-[40rem] md:max-h-screen">
          <DialogHeader className="text-2xl text-primary">
            <DialogTitle className="text-primary-500 inline-flex items-center space-x-2">
              <Image
                src="/images/loveme-icon.png"
                alt="Love Me Logo"
                width={150}
                height={150}
                className="w-[2rem] mr-3"
              />
              Sign Up
            </DialogTitle>

            <form action="/sign-up" method="POST" name="signUp" id="signUp">
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <Label className="text-gray-900">First Name</Label>
                    <Input
                      className="rounded-lg"
                      type="input"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="mb-4">
                    <Label className="text-gray-900">Birthdate</Label>
                    <Select required>
                      <SelectTrigger className="w-full rounded-lg text-gray-900">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="mb-4">
                    <Label className="text-gray-900">Last Name</Label>
                    <Input type="input" placeholder="Last Name" />
                  </div>
                  <div className="mb-4">
                    <Label className="text-gray-900">Year</Label>
                    <Select required>
                      <SelectTrigger className="w-full rounded-lg text-gray-900">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <Label className="text-gray-900">Country</Label>
                <Select required>
                  <SelectTrigger className="w-full rounded-lg text-gray-900">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-6">
                <Label className="text-gray-900">Postal Code</Label>
                <Input
                  className="rounded-lg"
                  type="input"
                  placeholder="Postal Code"
                />
              </div>

              <div className="mb-6">
                <Label className="text-gray-900">Email</Label>
                <Input
                  className="rounded-lg"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-6">
                <Label className="text-gray-900">Password</Label>
                <Input
                  className="rounded-lg"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="mb-6">
                <Label className="text-gray-900">Confirm Password</Label>
                <Input
                  className="rounded-lg"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>

              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-700 text-white rounded-full text-base p-3 w-full"
              >
                Submit
              </button>
            </form>
          </DialogHeader>
        </DialogContent>
      </div>
    </>
  );
}

export default SignUpModal;
