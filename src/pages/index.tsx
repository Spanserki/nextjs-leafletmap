import { GetCities, GetCompaniesFilter, GetUfs } from "@/hooks/server";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Stack,
  Text,
  Badge
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

export default function Home() {
  const Map = dynamic(() => import('./components/Map'), { ssr: false })
  const [ufId, setUfId] = useState('')
  const [cityId, setCityd] = useState('')
  const [zoomMap, setZoomMap] = useState(4)
  const [defaultLocal, setDefaultLocal] = useState({ lat: -9.976787, lgt: -57.465469 })
  const [isAuthorized, setisAuthorized] = useState('')
  const ufs = GetUfs()
  const cities = GetCities(`${ufId}`)
  const companiesFilter = GetCompaniesFilter(cityId, isAuthorized)

  useEffect(() => {
    queryClient.invalidateQueries(['companiesFilter', cityId, isAuthorized]);
    companiesFilter.refetch()
  }, [cityId, isAuthorized])

  async function handlerFilterMap(cityId: string) {
    setCityd(cityId)
    await api.get('/regions/companies', {
      params: {
        cityId
      }
    }).then(res => {
      if (!!res.data.length) {
        setZoomMap(12)
        setDefaultLocal({ lat: res.data[0].lat, lgt: res.data[0].lgt })
      } else {
        setZoomMap(4)
        setDefaultLocal({ lat: -9.976787, lgt: -57.465469 })
      }
    })
  }
  return (
    <Flex
      w='100%'
      h='100vh'
      justify='center'
      align='center'
      py={4}
    >
      <Stack
        w='100%'
        h='100%'
        maxH={600}
        maxW='8xl'
        direction='row'
        justify='center'
        align='center'
        px={6}
      >
        <Stack
          w='50%'
          h='100%'
          spacing={4}
          px={4}
        >
          <Text
            textTransform='uppercase'
            fontWeight='bold'
          >
            Localizar parceiros
          </Text>
          <Heading fontSize='5xl' maxW='sm' color='blue.700'>
            Onde encontrar a Ilumisol
          </Heading>
          <Text fontWeight='medium'>
            Encontre a Ilumisol mais próxima de você!
          </Text>
          <Text>
            A marca referência em energia solar no Brasil está perto de você!
            Com uma ampla rede de autorizados e revendedores autorizados, a Ilumisol está
            presente em todas as regiões do país, levando as melhores soluções em energia
            solar aos mais diferentes tipos de projetos. Preencha o quadro abaixo e descubra a unidade mais próxima:
          </Text>
          <FormControl>
            <FormLabel>Região</FormLabel>
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
            <FormLabel>Cidade</FormLabel>
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
          <Stack spacing={4}>
            <Text fontWeight='medium'>Mostrar apenas</Text>
            <RadioGroup onChange={setisAuthorized} value={isAuthorized}>
              <Stack direction='row'>
                <Radio value=''>Todos</Radio>
                <Radio value='true'>Autorizado Ilumisol</Radio>
                <Radio value='false'>Revendedor autorizado</Radio>
              </Stack>
            </RadioGroup>
          </Stack>
        </Stack>
        <Flex
          w='50%'
          h='100%'
          rounded='md'
          overflow='hidden'
        >
          {!!companiesFilter.isLoading ? (
            <Skeleton w='100%' h='100%' />
          ) : (
            <Map values={companiesFilter.data} defaultLocal={defaultLocal} zoomMap={zoomMap} />
          )}
        </Flex>
        <Stack h='100%' w='30%'>
          {!!companiesFilter.data && companiesFilter.data.map((item: any) => {
            return (
              <motion.div
                className="card"
                initial={{ translateX: 10, opacity: 0 }}
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
                  borderRightWidth={2}
                  borderRightColor={item.isAuthorized === 'true' ? 'blue.400' : 'yellow.400'}
                >
                  <Text fontSize='xs'>
                    {item.isAuthorized === 'true' ? 'Autorizado Ilumisol' : 'Revendedor autorizado'}
                  </Text>
                  <Text fontWeight='bold'>{item.name}</Text>
                  <Text>{item.address}</Text>
                  <Text>{item.cellphone}</Text>
                </Stack>
              </motion.div>
            )
          })}
        </Stack>

      </Stack>
    </Flex>
  )
}
