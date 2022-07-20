import React, { useState, useEffect } from 'react'
import { Stack, Typography, Box, TextField, Button } from '@mui/material';
import { fetchData, exerciseOptions } from '../utils/fetchData';
import HorisontalScrollbar from './HorisontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {

  const [search, setSearch] = useState('')
  const [bodyParts, setBodyParts] = useState([])

  const bodyPartListLink = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList'
  const exercisesLink = 'https://exercisedb.p.rapidapi.com/exercises'

  useEffect(() => {

    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(bodyPartListLink, exerciseOptions)

      localStorage.setItem('bodyPartsData', JSON.stringify(bodyPartsData))
      let savedBodyPartsData = JSON.parse(localStorage.getItem('bodyPartsData'))

      if (bodyPartsData.message) {
        setBodyParts(['all'])
      } else {
        setBodyParts(['all', ...savedBodyPartsData])
      }
    }
    fetchExercisesData()
  }, [])


  const handlseSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(exercisesLink, exerciseOptions)

      const searchedExercises = exercisesData.filter(
        (item) => item.name.toLowerCase().includes(search)
          || item.target.toLowerCase().includes(search)
          || item.equipment.toLowerCase().includes(search)
          || item.bodyPart.toLowerCase().includes(search)
      )

      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' })

      setSearch('')
      setExercises(searchedExercises)
    }
  }

  return (
    <Stack alignItems="center" mt="37px"
      justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="50px" textAlign="center">
        Awesome Exercises You <br />
        Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: '700',
              border: 'none',
              borderRadius: '4px'
            },
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px'
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button className="search-btn"
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: '0'
          }}
          onClick={handlseSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorisontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          bodyParts
        />
      </Box>
    </Stack>
  )
}

export default SearchExercises
