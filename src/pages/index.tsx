import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, DateRangePicker, Input, Select, SelectItem, Spinner } from '@nextui-org/react';

import DefaultLayout from "@/layouts/default";
import useData from "@/composables/useData";
import MapView from "@/components/MapView";

export default function IndexPage() {
  const { loadingData, data, getData } = useData();
  const [params, setParams] = useState({
    pickup_datetime_min: null as string | null,
    pickup_datetime_max: null as string | null,
    dropoff_datetime_min: null as string | null,
    dropoff_datetime_max: null as string | null,
    fare_min: null as number | null,
    fare_max: null as number | null,
    distance_min: null as number | null,
    distance_max: null as number | null,
    payment_type: null as string | null,
  });

  const payment_types = [
    { label: "Credit Card", value: "CRD" },
    { label: "Cash", value: "CSH" },
    { label: "Dispute", value: "DIS" },
    { label: "No Charge", value: "NOC" },
    { label: "Unknown", value: "UNK" },
  ];

  useEffect(() => {
    console.log(params);
    getData(params);
  }, [params]);

  const setPickupDateTime = (dates: any) => {
    setParams({
      ...params,
      pickup_datetime_min: dates.start.toDate().toISOString().replace('Z', ''),
      pickup_datetime_max: dates.end.toDate().toISOString().replace('Z', ''),
    });
  }

  const setDropoffDateTime = (dates: any) => {
    setParams({
      ...params,
      dropoff_datetime_min: dates.start.toDate().toISOString().replace('Z', ''),
      dropoff_datetime_max: dates.end.toDate().toISOString().replace('Z', ''),
    });
  }

  const setPaymentType = (e: any) => {
    setParams({ ...params, payment_type: e.currentKey });
  }

  return (
    <DefaultLayout>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold">Filter</h3>
        </CardHeader>
        <CardBody>
          <div className="grid lg:grid-cols-3 gap-3 md:grid-cols-2">
            <DateRangePicker showMonthAndYearPickers className="w-full" label="Pickup Time" onChange={setPickupDateTime} />
            <DateRangePicker showMonthAndYearPickers label="Dropoff Time" onChange={setDropoffDateTime} />
            <Input
              label="Minimum Fare"
              labelPlacement="inside"
              placeholder="0.00"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              type="number"
              onChange={(e) => setParams({ ...params, fare_min: +e.target.value })}
            />
            <Input
              label="Maximum Fare"
              labelPlacement="inside"
              placeholder="0.00"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              type="number"
              onChange={(e) => setParams({ ...params, fare_max: +e.target.value })}
            />
            <Input
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">Miles</span>
                </div>
              }
              label="Minimum Distance"
              labelPlacement="inside"
              placeholder="0"
              type="number"
              onChange={(e) => setParams({ ...params, distance_min: +e.target.value })}
            />
            <Input
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">Miles</span>
                </div>
              }
              label="Maximum Distance"
              labelPlacement="inside"
              placeholder="0"
              type="number"
              onChange={(e) => setParams({ ...params, distance_max: +e.target.value })}
            />
            <Select
              label="Payment Type"
              placeholder="Select Payment Type"
              onSelectionChange={setPaymentType}
            >
              {payment_types.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </CardBody>
      </Card>
      
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {loadingData ? (
          <Spinner size="lg" >
            <p className="text-lg text-center text-default-900">
              {loadingData ? "Loading data..." : "Data loaded"}
            </p>
          </Spinner>
        ) : (
          // <p className="text-lg text-center text-default-900">
          //   {data.map((item, index) => (
          //     <p key={index}>{item.payment_type}</p>
          //   ))}
          // </p>
          <MapView data={data}/>
        )}
      </section>
    </DefaultLayout>
  );
}
