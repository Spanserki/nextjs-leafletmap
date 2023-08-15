import { Flex, FormControl, FormLabel, Heading, Select, Stack } from "@chakra-ui/react";
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useState } from "react";

interface MapProps {
  value: [number, number], label: string
}[]

interface RegionProps {
  citySelected?: string,
  UF?: string,
}[]


const regions = [
  { id: 1, UF: 'MT', latlong: '-13.0762451, -55.9997556', },
  { id: 2, UF: 'PR', latlong: '-24.623632, -51.654840', },
]

const cityLocals = [
  { id: 1, city: 'Cascavel/PR', UF: 'PR', latlong: '-24.954731, -53.480295' },
  { id: 1, city: 'Londrina', UF: 'PR', latlong: '-23.301891, -51.183638' },
  { id: 2, city: 'Primavera do Leste', UF: 'MT', latlong: '-15.550391, -54.296726' },
  { id: 3, city: 'Nova Monte Verde', UF: 'MT', latlong: '-9.976787, -57.465469' },
]

export default function Home() {
  const Map = dynamic(() => import('./components/Map'), { ssr: false })
  const [latLong, setLatLong] = useState<string>('-10.089198,-51.975657')
  const [citys, setCitys] = useState<any[]>([])
  const [zoomMap, setZoomMap] = useState(4)
  async function handleRegionFilterMap({ citySelected, UF }: RegionProps) {
    if (citySelected) {
      setLatLong(citySelected)
      setZoomMap(12)
    }
    if (UF) {
      const getLatLongByUf = regions.filter(u => u.UF === UF).map(r => { return (r.latlong) })
      if (String(getLatLongByUf) === latLong) { return }
      const getCitysByUf = cityLocals.filter(u => u.UF === UF)
      setLatLong(String(getLatLongByUf))
      setZoomMap(6)
      if (getCitysByUf != citys) {
        setCitys([''])
      }
      setCitys(getCitysByUf)
    }
  }
  return (
    <Flex
      w='100%'
      h='100vh'
      align='center'
      justify='center'
    >
      <Stack
        w='100%'
        h='100%'
        maxH={600}
        maxW='7xl'
        direction='row'
        justify='center'
        align='center'
        px={6}
      >
        <Stack
          w='50%'
          h='100%'
          align='center'
          justify='flex-start'
          spacing={8}
          px={4}
        >
          <Heading fontSize='xl'>
            Unidades Ilumisol espalhadas no território nacional
          </Heading>
          <FormControl>
            <FormLabel>Procure por região</FormLabel>
            <Select
              onClick={(e: any) => handleRegionFilterMap({ UF: e.target.value })}
              placeholder="--selecione--"
            >
              {regions.map(item => {
                return (
                  <option key={item.id} value={`${item.UF}`}>{item.UF}</option>
                )
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Procure por cidade</FormLabel>
            <Select
              onClick={(e: any) => handleRegionFilterMap({ citySelected: e.target.value })}
              placeholder="--selecione--"
            >
              {citys.map((item: any) => {
                return (
                  <option key={item.id} value={`${item.latlong}`}>{item.city}</option>
                )
              })}
            </Select>
          </FormControl>
        </Stack>
        <Flex
          w='50%'
          h='100%'
          rounded='md'
          overflow='hidden'
        >
          <Map defaultCenter={latLong} zoom={zoomMap} />
        </Flex>
      </Stack>
    </Flex>
  )
}
