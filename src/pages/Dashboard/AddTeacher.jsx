import React, { useState, useEffect } from "react";
import { Messege } from "../../assets/images/Icons";
import Button from "../../components/Button";
import Sidebar from "../../components/Sidebar";
import Input from "../../components/Input";
import { useParams } from "react-router-dom";

function AddTeacher() {
    const {id} = useParams()
    const [formData, setFormData] = useState({
        fullName: "",
        classes: "",
        email: "",
        gender: "",
        subject: "",
        age: "",
        about: "",
        img: "",
    });
    const [imgSrc, setImgSrc] = useState(null);
    const classes = ["JSS 1", "JSS 2", "JSS 3", "SS 3", "JSS 4", "JSS 5"];
    const genders = ["Male", "Female"];

    // Check if there's existing data in localStorage (edit mode)
    useEffect(() => {
        const storedTeacher = JSON.parse(localStorage.getItem("selectedTeacher"));
        if (storedTeacher) {
            setFormData(storedTeacher);
            setImgSrc(storedTeacher.imgSrc || null);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgSrc(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTeacher = { ...formData, imgSrc };
        let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

        const storedTeacher = JSON.parse(localStorage.getItem("selectedTeacher"));
        
        if (storedTeacher) {
            const updatedTeachers = teachers.map(teacher => 
                teacher.email === storedTeacher.email ? newTeacher : teacher
            );
            localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
            localStorage.removeItem("selectedTeacher");
        } else {
            teachers.push(newTeacher);
            localStorage.setItem("teachers", JSON.stringify(teachers));
        }
        
        window.location.href = "/teachers"; 
    };

    return (
        <div className="w-full flex">
            <Sidebar />
            <div className="flex flex-col w-[1061px] ml-[58px] relative">
                <div className="flex justify-end mt-[31px] items-center gap-[38px]">
                    <Messege />
                    <Button
                        extraStyle="!w-[70px] bg-transparent !text-[#424242] "
                        title="Log out"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between h-[41px] mt-[22px]">
                        <h2 className="text-[#4F4F4F] text-[20px]  font-medium">
                            {formData.fullName ? "Add Teacher" : "Update Teacher"}
                        </h2>
                        <Button extraStyle="!w-[118px] " title="Save" type="submit" />
                    </div>
                    <div className="mt-[41px] w-[900px] flex flex-wrap gap-[60px] pb-5 ">
                        <label className="flex flex-col text-slate-400">
                            <span>Full Name</span>
                            <Input
                                isRequired={true}
                                placeholder="Full Name"
                                type="text"
                                name="fullName"
                                extraStyle="border-[1px] border-slate-400 !w-[407px]"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="flex flex-col text-slate-400">
                            Class
                            <select
                                required
                                className="w-[407px] outline-none font-medium rounded p-[13px] border-slate-400  text-sm border-[.5px] leading-[17.36px]"
                                name="classes"
                                value={formData.classes}
                                onChange={handleInputChange}
                            >
                                <option value="" defaultValue>
                                    Class
                                </option>
                                {classes.map((classLevel, index) => (
                                    <option
                                        value={classLevel.toLowerCase()}
                                        key={index + 1}
                                    >
                                        {classLevel}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="flex flex-col text-slate-400">
                            <span>Email Address</span>
                            <Input
                                isRequired={true}
                                placeholder="Email Address"
                                type="email"
                                name="email"
                                extraStyle="border-[1px] border-slate-400 !w-[407px]"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="flex flex-col text-slate-400">
                            Gender
                            <select
                                required
                                className="w-[407px] outline-none font-medium rounded p-[13px]  text-sm border-[.5px] border-gray-400 leading-[17.36px]"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                            >
                                {genders.map((gender, index) => (
                                    <option
                                        value={gender.toLowerCase()}
                                        key={index + 1}
                                    >
                                        {gender}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="flex flex-col text-slate-400">
                            <span>Subject</span>
                            <Input
                                isRequired={true}
                                placeholder="Subject"
                                type="text"
                                name="subject"
                                extraStyle="border-[1px] border-slate-400 !w-[407px]"
                                value={formData.subject}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="flex flex-col text-slate-400">
                            <span className="pl-[7px]">Age</span>
                            <Input
                                isRequired={true}
                                placeholder="Age"
                                type="number"
                                name="age"
                                extraStyle="border-[1px] border-slate-400 !w-[407px]"
                                value={formData.age}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="flex flex-col text-slate-400">
                            <span>About</span>
                            <textarea
                                placeholder="About"
                                rows={8}
                                name="about"
                                required
                                className="w-[407px] h-[100px] outline-none placeholder:text-gray-200 font-medium rounded p-[13px] resize-none  text-sm border-[.5px] border-gray-400"
                                value={formData.about}
                                onChange={handleInputChange}
                            >
                            </textarea>
                        </label>
                        <label className="flex flex-col text-slate-400 items-center">
                            <Input
                                isRequired={true}
                                type="file"
                                onChange={handleImageUpload}
                                name="img"
                                extraStyle="hidden"
                            />
                            <p className=" text-[18px] text-slate-400 cursor-pointer">Import Img</p>
                            {imgSrc && (
                                <img src={imgSrc} alt="Selected" className="mt-2 w-[100px] h-[100px] object-cover rounded-md"/>
                            )}
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTeacher;
