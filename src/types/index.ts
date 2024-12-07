import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type DataFilter = {
  time_min?: string | null
  time_max?: string | null
  fare_min?: number | null
  fare_max?: number | null
  distance_min?: number | null
  distance_max?: number | null
  payment_type?: string | null
}

export type TaxiData = {
  vendor_id: string,
  pickup_datetime: Date,
  dropoff_datetime: Date,
  passenger_count: number,
  trip_distance: number,
  pickup_longitude: number,
  pickup_latitude: number,
  store_and_fwd_flag: string,
  dropoff_longitude: number,
  dropoff_latitude: number,
  payment_type: string,
  fare_amount: number,
  mta_tax: number,
  tip_amount: number,
  tolls_amount: number,
  total_amount: number,
  imp_surcharge: number,
  rate_code: number
}