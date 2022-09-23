
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup'
import useMarvelServices from '../services/MarvelServices';
import './searchPanel.scss'
import { Link } from 'react-router-dom';
import Error from '../errorMessage/errorMessage';
const SearchPanel = () => {
    const [char, setChar] = useState(null)
    const { loading, error, getCharacterByName, clearError,process,setProcess } = useMarvelServices();


    const onCharUpdate = (name) => {
        clearError()
        getCharacterByName(name).then(updateChars).then(() => setProcess('confirmed'))
    }
    const updateChars = (charName) => {
        setChar(charName)
}
 
const errorMessage = process === 'error' ? <div className="char__search-critical-error"><Error/></div> : null;
    const results = !char ? null : char.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;
    return (
        <div className='char__search-form'>
             <Formik initialValues={{
            search: ''
        }}
            validationSchema={Yup.object({
                search: Yup.string()
                           .required('This field is required')
            })}
            onSubmit={({ search }) => {
                onCharUpdate(search)
            }}
        >
       
            <Form>
                <label htmlFor="char__search-label">Or find a character by name:</label>
                <div className='char__search-wrapper'>
                        <Field
                        id= 'search'
                        name='search'
                        type = 'text'
                        placeholder="Enter name" />
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={process === "loading"}>
                            <div className="inner">find</div>
                        </button>
                </div>
                 <FormikErrorMessage className='char__search-error' name='search' component='div' />
            </Form>
            </Formik>
            {errorMessage}
            {results}
       </div>
    )
}
export default SearchPanel