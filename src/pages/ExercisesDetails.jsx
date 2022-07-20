import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import Detail from '../components/Detail';
import ExersicesVideos from '../components/ExersicesVideos';
import SimilarExercises from '../components/SimilarExercises';
import { useParams } from 'react-router-dom';
import { fetchData, exerciseOptions, yotubeOptions } from '../utils/fetchData';
import Loader from '../components/Loader';

const ExercisesDetails = () => {

  const { id } = useParams()
  const [exerciseDetail, setExerciseDetail] = useState({})
  const [exercisesVideos, setExercisesVideos] = useState([])
  const [turgetMuscleExercise, setTurgetMuscle] = useState([])
  const [equipmentExercise, setEquipmentExercise] = useState([])



  useEffect(() => {
    const fetchExercisesData = async () => {

      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com'
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com'


      const exercisesDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions)
      setExerciseDetail(exercisesDetailData)

      const yotubeDetailData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exercisesDetailData.name} exercise`, yotubeOptions)
      setExercisesVideos(yotubeDetailData.contents)

      const turgetMuscleExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/target/${exercisesDetailData.target}`,
        exerciseOptions)
      setTurgetMuscle(turgetMuscleExercisesData)

      const equipmentExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/equipment/${exercisesDetailData.equipment}`,
        exerciseOptions)
      setEquipmentExercise(equipmentExercisesData)
    }
    fetchExercisesData()
  }, [id])

  if (!exerciseDetail) return <Loader />

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExersicesVideos exercisesVideos={exercisesVideos} name={exerciseDetail.name} />
      <SimilarExercises equipmentExercise={equipmentExercise} turgetMuscleExercise={turgetMuscleExercise} />
    </Box>
  )
}

export default ExercisesDetails
