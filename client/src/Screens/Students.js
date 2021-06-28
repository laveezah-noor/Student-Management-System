import React from 'react'
import List from '../Components/List'

export default function Students() {
    return (
        
        <div className="m-5">
            <div className="Head pb-3">
                <span className="h1">Students</span>
            </div>
            <div className="content">
                <div className="row">
                    <div className="col">
                        {/* Search Bar */}
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col">
                        {/* Filters */}
                        <div class="dropdown">
                          <span className="h5">
                              {/* Filter Name */}
                              Semester
                          </span>
                          <select name="semester" id="semesters">
                                <option value="semester1">Semester 1</option>
                                <option value="semester2">Semester 2</option>
                                <option value="semester3">Semester 3</option>
                                <option value="semester4">Semester 4</option>
                                <option value="semester5">Semester 5</option>
                                <option value="semester6">Semester 6</option>
                                <option value="semester7">Semester 7</option>
                                <option value="semester8">Semester 8</option>
                          </select>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row m-4">
                    {/* List */}
                    <List/>
                </div>
            </div>
        </div>
    )
}
