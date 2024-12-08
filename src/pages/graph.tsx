import { useEffect } from "react";
import { Card, CardBody, CardHeader, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Doughnut, Bar } from "react-chartjs-2";

import useData from "@/composables/useData";
import DefaultLayout from "@/layouts/default";
import { formatCurrency } from "@/utils/format";

export default function GraphPage() {
  const { loadingData, data, getData } = useData();

  useEffect(() => {
    getData();
  }, []);

  return (
    <DefaultLayout>
      <div className="grid lg:grid-cols-3 gap-3 md:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold">Most Popular Payment</h3>
          </CardHeader>
          <CardBody>
            {loadingData ? (
              <Spinner size="lg" />
            ) : (
              <Doughnut
                data={{
                  labels: ["Credit Card", "Cash", "Dispute", "No Charge", "Unknown"],
                  datasets: [
                    {
                      label: "Payment Type",
                      data: [
                        data.filter((item) => item.payment_type === "CRD").length,
                        data.filter((item) => item.payment_type === "CSH").length,
                        data.filter((item) => item.payment_type === "DIS").length,
                        data.filter((item) => item.payment_type === "NOC").length,
                        data.filter((item) => item.payment_type === "UNK").length,
                      ],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function(context: any) {
                          return `Total: ${context.raw}`;
                        },
                      },
                    },
                  },
                }}
              />
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold">Earnings by Month</h3>
          </CardHeader>
          <CardBody>
            {loadingData ? (
              <Spinner size="lg" />
            ) : (
              <Bar
                data={{
                  labels: [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                  ],
                  datasets: [
                    {
                      label: "Total Earnings",
                      data: [
                        data.filter((item) => new Date(item.pickup_datetime).getMonth() === 0)
                          .reduce((acc, curr) => acc + +curr.total_amount, 0),
                        data.filter((item) => new Date(item.pickup_datetime).getMonth() === 1)
                          .reduce((acc, curr) => acc + +curr.total_amount, 0),
                        data.filter((item) => new Date(item.pickup_datetime).getMonth() === 2)
                          .reduce((acc, curr) => acc + +curr.total_amount, 0),
                        data.filter((item) => new Date(item.pickup_datetime).getMonth() === 3)
                          .reduce((acc, curr) => acc + +curr.total_amount, 0),
                        data.filter((item) => new Date(item.pickup_datetime).getMonth() === 4)
                          .reduce((acc, curr) => acc + +curr.total_amount, 0),
                        data.filter((item) => new Date(item.pickup_datetime).getMonth() === 5)
                          .reduce((acc, curr) => acc + +curr.total_amount, 0),
                        data.filter((item) => new Date(item.pickup_datetime).getMonth() === 6)
                          .reduce((acc, curr) => acc + +curr.total_amount, 0),
                        data.filter((item) => new Date(item.pickup_datetime).getMonth() === 7)
                          .reduce((acc, curr) => acc + +curr.total_amount, 0),
                        data.filter((item) => new Date(item.pickup_datetime).getMonth() === 8)
                          .reduce((acc, curr) => acc + +curr.total_amount, 0),
                        data.filter((item) => new Date(item.pickup_datetime).getMonth() === 9)
                          .reduce((acc, curr) => acc + +curr.total_amount, 0),
                        data.filter((item) => new Date(item.pickup_datetime).getMonth() === 10)
                          .reduce((acc, curr) => acc + +curr.total_amount, 0),
                        data.filter((item) => new Date(item.pickup_datetime).getMonth() === 11)
                          .reduce((acc, curr) => acc + +curr.total_amount, 0),
                      ],
                      backgroundColor: "rgba(54, 162, 235, 0.2)",
                      borderColor: "rgba(54, 162, 235, 1)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      }
                    },
                    y: {
                      grid: {
                        display: false,
                      }
                    }
                  },
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function(context: any) {
                          return `Total Earnings: ${formatCurrency(context.raw)}`;
                        },
                      },
                    },
                  },
                }}
              />
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold">Earnings Analysis</h3>
          </CardHeader>
          <CardBody>
            {loadingData ? (
              <Spinner size="lg" />
            ) : (
              <Table>
                <TableHeader>
                  <TableColumn>Gross Revenue</TableColumn>
                  <TableColumn>{formatCurrency(data.reduce((acc, curr) => acc + +curr.total_amount, 0))}</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Total Fare Revenue</TableCell>
                    <TableCell>{formatCurrency(data.reduce((acc, curr) => acc + +curr.fare_amount, 0))}</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Total Tip Received</TableCell>
                    <TableCell>{formatCurrency(data.reduce((acc, curr) => acc + +curr.tip_amount, 0))}</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Total Tolls Amount</TableCell>
                    <TableCell>{formatCurrency(data.reduce((acc, curr) => acc + +curr.tolls_amount, 0))}</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>Total Imp Surcharge</TableCell>
                    <TableCell>{formatCurrency(data.reduce((acc, curr) => acc + +curr.imp_surcharge, 0))}</TableCell>
                  </TableRow>
                  <TableRow key="5">
                    <TableCell>Total Tax</TableCell>
                    <TableCell>{formatCurrency(data.reduce((acc, curr) => acc + +curr.mta_tax, 0))}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold">Most Common Passenger Count</h3>
          </CardHeader>
          <CardBody>
            {loadingData ? (
              <Spinner size="lg" />
            ) : (
              <Bar
                data={{
                  labels: ["1", "2-3", "4-5", "6+"],
                  datasets: [
                    {
                      label: "Passenger Count",
                      data: [
                        data.filter((item) => +item.passenger_count === 1).length,
                        data.filter((item) => +item.passenger_count >= 2 && +item.passenger_count <= 3 ).length,
                        data.filter((item) => +item.passenger_count >= 4 && +item.passenger_count <= 5 ).length,
                        data.filter((item) => +item.passenger_count >= 6).length,
                      ],
                      backgroundColor: "rgba(255, 99, 132, 0.2)",
                      borderColor: "rgba(255, 99, 132, 1)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function(context: any) {
                          return `Total: ${context.raw}`;
                        },
                      },
                    },
                  },
                }}
              />
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold">Most Common Trip Distance</h3>
          </CardHeader>
          <CardBody>
            {loadingData ? (
              <Spinner size="lg" />
            ) : (
              <Bar
                data={{
                  labels: ["Short (0-5 miles)", "Medium (6-10 miles)", "Long (11+ miles)"],
                  datasets: [
                    {
                      label: "Trip Distance",
                      data: [
                        data.filter((item) => +item.trip_distance >= 0 && +item.trip_distance <= 5).length,
                        data.filter((item) => +item.trip_distance >= 6 && +item.trip_distance <= 10 ).length,
                        data.filter((item) => +item.trip_distance >= 11).length,
                      ],
                      backgroundColor: "rgba(255, 99, 132, 0.2)",
                      borderColor: "rgba(255, 99, 132, 1)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function(context: any) {
                          return `Total: ${context.raw}`;
                        },
                      },
                    },
                  },
                }}
              />
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold">Trip Analysis</h3>
          </CardHeader>
          <CardBody>
            {loadingData ? (
              <Spinner size="lg" />
            ) : (
              <Table hideHeader>
                <TableHeader>
                  <TableColumn>column</TableColumn>
                  <TableColumn>column</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Total Trips</TableCell>
                    <TableCell>{data.length}</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Total Distance</TableCell>
                    <TableCell>{data.reduce((acc, curr) => acc + +curr.trip_distance, 0).toFixed(1)} Miles</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Average Time per Trip</TableCell>
                    <TableCell>{(data.reduce((acc, curr) => acc + +(new Date(curr.dropoff_datetime)) - +(new Date(curr.pickup_datetime)), 0) / data.length / 1000 / 60).toFixed(1)} Minutes</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Average Distance per Trip</TableCell>
                    <TableCell>{(data.reduce((acc, curr) => acc + +curr.trip_distance, 0) / data.length).toFixed(1)} Miles</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>Average Fare Amount per Miles</TableCell>
                    <TableCell>{formatCurrency(data.reduce((acc, curr) => acc + +curr.fare_amount, 0) / data.reduce((acc, curr) => acc + +curr.trip_distance, 0))}</TableCell>
                  </TableRow>
                  <TableRow key="5">
                    <TableCell>Average Tip Amount per Trip</TableCell>
                    <TableCell>{formatCurrency(data.reduce((acc, curr) => acc + +curr.tip_amount, 0) / data.length)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>
      </div>
      
    </DefaultLayout>
  );
}