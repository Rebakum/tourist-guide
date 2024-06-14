import useAuth from '../../../Hook/useAuth'
import { Helmet } from 'react-helmet-async'
import useRole from '../../../Hook/useRole'
import LoadingSpinner from '../../../Shared/Navbar/Loading/LoadingSpinner'

const Profile = () => {
  const { user, loading } = useAuth() || {}
  const [role, isLoading] = useRole()
  console.log('rol',role)

  console.log(user)
  if (isLoading || loading) return <LoadingSpinner />
  return (
    <div className='flex justify-center items-center h-screen'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      
      <div className='bg-white shadow-lg rounded-2xl w-full md:w-3/5'>
        <img
          alt='profile'
          src='https://img.freepik.com/premium-photo/empty-background-scene-dark-street-reflection-wet-asphalt-rays-neon-light-dark-neon-figures-smoke-background-empty-stage-show-abstract-dark-background_183410-31.jpg?w=900'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='p-2 uppercase px-4 text-xs text-white bg-btn rounded-full'>
            {role}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>
            User Id: {user?.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='text-xl text-cyan-950  text-center'>
              <p>Name: {user.displayName}</p>
              <p>Email: {user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile