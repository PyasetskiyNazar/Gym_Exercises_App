import React, { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination'
import { Box, Typography, Stack } from '@mui/material';
import ExerciseCard from './ExerciseCard';
import { fetchData, exerciseOptions } from '../utils/fetchData';
import Loader from './Loader';


const Exercises = ({ setExercises, exercises, bodyPart }) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [exercisesPerPage] = useState(6)

  useEffect(() => {

    const fetchExercisesData = async () => {
      let exerciseData = []

      if (bodyPart === 'all') {
        exerciseData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises',
          exerciseOptions
        )
      } else {
        exerciseData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        )
      }

      localStorage.setItem('exerciseData', JSON.stringify(exerciseData));
      let savedExercisesData = JSON.parse(localStorage.getItem('exerciseData'));

      if (exerciseData.message && savedExercisesData.length === 0) {
        setExercises([])
      } else {
        setExercises(savedExercisesData)
      }
    }
    fetchExercisesData()
  }, [bodyPart])


  //Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage
  let currentExercises = []

  if (exercises) {
    currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)
  }

  const paginate = (event, value) => {
    setCurrentPage(value)
    window.scrollTo({ top: 1800, behavior: 'smooth' })
  }

  if (!currentExercises.length === 0) return <Loader />

  return (
    <Box id="exercises" sx={{ mt: { lg: '144px', xs: '70px' } }} alignItems="center">
      <Typography variant="h4" fontWeight="bold" mb="46px"
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
      >
        Showing Results
      </Typography>
      <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }}
        flexWrap="wrap" justifyContent="center"
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  )
}

export default Exercises
