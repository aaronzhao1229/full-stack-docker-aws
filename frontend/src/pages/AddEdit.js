import React ,{useState,useEffect}from 'react'
import {useNavigate, useParams, Link} from 'react-router-dom'
import './AddEdit.css'
import axios from 'axios'
import { toast } from 'react-toastify'


axios.defaults.baseURL = process.env.REACT_APP_API_URL

const initialState = {
    name:"",
    email:"",
    contact:""
}

const AddEdit = () => {
  const[state,setState] = useState(initialState)

  const{name,email,contact} = state;
  
  const navigator = useNavigate()

  const {id} = useParams();

  useEffect(() =>{
    axios
    .get(`/get/${id}`)
    .then((resp) => setState({...resp.data[0]}));
  },[id])  

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!name || !email || !contact)
        toast.error("Please provide value in input field",{position:toast.POSITION.TOP_CENTER});
    else{
        if(!id){
            axios.post("/post",{
                name,
                email,
                contact
            }).then(()=>{
                setState({name:"",email:"",contact:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Contact Added Successfully", {position:toast.POSITION.TOP_CENTER});
                  
        }
        else{
            axios.put(`/update/${id}`,{
                name,
                email,
                contact
            }).then(()=>{
                setState({name:"",email:"",contact:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Contact Updated Successfully", {position:toast.POSITION.TOP_CENTER});
        }
        setTimeout(() => navigator("/"), 500);
    }
  }  

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setState({...state,[name] :value})
  }

  return (
    <div style={{marginTop: '100px'}}>
        <form style={{
            margin:'auto',
            padding:'15px',
            maxWidth:'400px',
            alignContent:'center'
        }}
        onSubmit={handleSubmit}
        >
            <label htmlFor='name'>Name</label>
            <input
                type='text'
                id = 'name'
                name='name' 
                placeholder='Enter Name...'
                value={name||""}
                onChange={handleInputChange}
            />
            <label htmlFor='email'>Email</label>
            <input
                type='email'
                id = 'email'
                name='email' 
                placeholder='Enter Email...'
                value={email||""}
                onChange={handleInputChange}
            />
            <label htmlFor='contact'>Contact</label>
            <input
                type="number"
                id = 'contact'
                name='contact' 
                placeholder='Enter mobile no...'
                value={contact||""}
                onChange={handleInputChange}
            />
            <input type='submit' value={id?"Update":"Save"}/>
            <Link to='/'>
                <input type='button' value='Go Back' />
            </Link>
        </form>
    </div>
  )
}

export default AddEdit