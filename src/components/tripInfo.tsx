import { Popup } from 'react-leaflet'
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'
import { MapPin, MapPinCheck, Minus, MoveRight, Users } from 'lucide-react'
import { Card } from '@nextui-org/react'

import { TaxiData } from "@/types"
import { formatCurrency, formatDate } from '@/utils/format'

interface TripViewProps {
  item: TaxiData
}

const TripInfo: React.FC<TripViewProps> = ({item}) => {
  return (
    <Popup autoPan={true} closeButton={false}>
      <h2>Trip Information</h2>
      <div>
        <div className='flex justify-between content-center mt-2 mb-4 align-self-center'>
          <div className='my-auto'><strong>Vendor ID:</strong> {item.vendor_id}</div>
          <Tooltip closeDelay={0} content={
            <div className="px-1 py-2">
              <div className="text-small font-bold">Passenger Count</div>
              <div className="text-tiny">{item.passenger_count} Person</div>
            </div>
          }>
              <Chip color="success" size='lg' startContent={<Users className="m-1" size={22} />} variant="flat">
            {item.passenger_count}
          </Chip>
          </Tooltip>
        </div>
        <Card className='py-2 min-w-56' shadow='none'>
        <div className="flex justify-between">
          <Tooltip closeDelay={0} content={
            <div className="px-1 py-2">
              <div className="text-small font-bold">Pickup Time</div>
              <div className="text-tiny">{formatDate(item.pickup_datetime).toString()}</div>
            </div>
          }>
              <MapPin className='ms-2' size={24}/>
          </Tooltip>
          <Minus/>
          <strong className="content-center">{(+item.trip_distance).toFixed(1)} Miles</strong>
          <MoveRight />
          <Tooltip closeDelay={0} content={
            <div className="px-1 py-2">
              <div className="text-small font-bold">Dropoff Time</div>
              <div className="text-tiny">{formatDate(item.dropoff_datetime).toString()}</div>
            </div>
          }>
              <MapPinCheck className='me-2' size={24}/>
          </Tooltip>
          
        </div>
        </Card>
        <Table className='mt-4' color='warning'>
          <TableHeader>
            <TableColumn>Total Amount</TableColumn>
            <TableColumn>{formatCurrency(item.total_amount)}</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className='text-slate-400'>Fare Amount</TableCell>
              <TableCell className='text-slate-400'>{formatCurrency(item.total_amount)}</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell className='text-slate-400'>Tolls Amount</TableCell>
              <TableCell className='text-slate-400'>{formatCurrency(item.tolls_amount)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell className='text-slate-400'>Tip Amount</TableCell>
              <TableCell className='text-slate-400'>{formatCurrency(item.tip_amount)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell className='text-slate-400'>MTA Tax</TableCell>
              <TableCell className='text-slate-400'>{formatCurrency(item.mta_tax)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell className='text-slate-400'>IMP Surcharge</TableCell>
              <TableCell className='text-slate-400'>{formatCurrency(item.imp_surcharge)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell className='text-slate-400'>Payment Type</TableCell>
              <TableCell className='text-slate-400'>{item.payment_type}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </Popup>
  )
}

export default TripInfo;