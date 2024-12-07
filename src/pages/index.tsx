import DefaultLayout from "@/layouts/default";
import useData from "@/composables/useData";
import { useEffect, useRef } from "react";
import { Spinner } from '@nextui-org/react';
import MapView from "@/components/MapView";

export default function IndexPage() {
  const { loadingData, data, getData } = useData();

  const params = useRef({
    time_min: null,
    time_max: null,
    fare_min: null,
    fare_max: null,
    distance_min: null,
    distance_max: null,
    payment_type: null,
  });

  useEffect(() => {
    getData(params.current);
  }, [params]);

  return (
    <DefaultLayout>
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
