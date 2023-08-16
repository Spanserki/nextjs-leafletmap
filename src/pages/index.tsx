import { GetCities, GetUfs } from "@/hooks/server";
import { api } from "@/lib/api";
import { Flex, FormControl, FormLabel, Heading, Select, Stack, Text } from "@chakra-ui/react";
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const Map = dynamic(() => import('./components/Map'), { ssr: false })
  const [ufId, setUfId] = useState('')
  const [zoomMap, setZoomMap] = useState(4)
  const [defaultLocal, setDefaultLocal] = useState({ lat: -9.976787, lgt: -57.465469 })
  const [companies, setCompanies] = useState<any[]>([])
  const ufs = GetUfs()
  const cities = GetCities(`${ufId}`)
  useEffect(() => {
    setCompanies([])
  }, [ufId])
  async function handlerFilterMap(cityId: string) {
    await api.get('/regions/companies', {
      params: {
        cityId
      }
    }).then(res => {
      if (!!res.data.length) {
        setCompanies(res.data)
        setZoomMap(12)
        setDefaultLocal({ lat: res.data[0].lat, lgt: res.data[0].lgt })
      } else {
        setZoomMap(4)
        setCompanies([])
        setDefaultLocal({ lat: -9.976787, lgt: -57.465469 })
      }
    })
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
              onChange={(e) => setUfId(e.target.value)}
              placeholder="--selecione--"
            >
              {!!ufs.data && ufs.data.map((item: any) => {
                return (
                  <option key={item.id} value={`${item.id}`}>{item.name}</option>
                )
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Procure por cidade</FormLabel>
            <Select
              onClick={(e: any) => handlerFilterMap(e.target.value)}
              placeholder="--selecione--"
            >
              {!!cities.data && cities.data.map((item: any) => {
                return (
                  <option key={item.id} value={`${item.id}`}>{item.name}</option>
                )
              })}
            </Select>
          </FormControl>
          {!!companies && companies.map((item: any) => {
            return (
              <Stack
                w='100%'
                align='flex-start'
              >
                <motion.div
                  className="card"
                  initial={{ translateX: -10, opacity: 0 }}
                  animate={{ translateX: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  <Stack
                    w='100%'
                    align='flex-start'
                    fontSize='sm'
                    bgColor='gray.50'
                    p={2}
                    rounded='md'
                  >
                    <Text fontWeight='bold'>{item.name}</Text>
                    <Text>{item.address}</Text>
                    <Text>{item.cellphone}</Text>
                  </Stack>
                </motion.div>
              </Stack>
            )
          })}
        </Stack>
        <Flex
          w='50%'
          h='100%'
          rounded='md'
          overflow='hidden'
        >
          <Map values={companies} defaultLocal={defaultLocal} zoomMap={zoomMap} />
        </Flex>
      </Stack>
    </Flex>
  )
}
