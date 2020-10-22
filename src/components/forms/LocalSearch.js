
import React from 'react'

const LocalSearch= ({keyword, setKeyword}) => {

    //step 3
const handleSearchKeyword = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
}
return(
        <div className='container pt-4 pb-4'>
            <input type='search'
            placeholder='Search Something'
            value={keyword}
            onChange={handleSearchKeyword}
            className='form-control mb-5'
            />
    </div>
    )
}

export default LocalSearch
