import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Students, Billing, Settings, Features, Exams, AddTeacher ,More } from "../../pages/Dashboard";
import { BallTriangle } from 'react-loader-spinner'; // ThreeDots o'rniga BallTriangle import qilindi

function DashboaardPage() {
    const Dashboard = lazy(
        () =>
            new Promise((resolve) => {
                return setTimeout(
                    () => resolve(import("../../pages/Dashboard/Dashboard")),
                    1500
                );
            })
    );
    
    const Teachers = lazy(
        () =>
            new Promise((resolve) => {
                return setTimeout(
                    () => resolve(import("../../pages/Dashboard/Teachers")),
                    1500
                );
            })
    );

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense
                        fallback={
                            <div className="w-screen h-screen flex items-center justify-center bg-[#152259]">
                                <BallTriangle // ThreeDots o'rniga BallTriangle ishlatilmoqda
                                    height={80}
                                    width={80}
                                    color="white"
                                    ariaLabel="ball-triangle-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            </div>
                        }
                    >
                        <Dashboard />
                    </Suspense>
                }
            ></Route>
            <Route
                path="/teachers"
                element={
                    <Suspense
                        fallback={
                            <div className="w-screen h-screen flex items-center justify-center bg-[#152259]">
                                <BallTriangle // ThreeDots o'rniga BallTriangle ishlatilmoqda
                                    height={80}
                                    width={80}
                                    color="white"
                                    ariaLabel="ball-triangle-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            </div>
                        }
                    >
                        <Teachers />
                    </Suspense>
                }
            ></Route>
            <Route path="/teachers/:id" element={<AddTeacher />} />
            <Route path="/teachers/2" element={<More />} />
            <Route path="/students" element={<Students />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/features" element={<Features />} />
        </Routes>
    );
}

export default DashboaardPage;
