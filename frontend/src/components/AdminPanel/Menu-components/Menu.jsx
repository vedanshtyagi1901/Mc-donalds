import React from 'react';
import TableRow from './TableRow';

function Menu() {

    return (
        <>
            <div className="container mx-auto mt-4 p-4 w-[1000px] bg-[rgb(16,20,34)] rounded-lg shadow-lg">
                <h1 className="text-2xl mb-4 text-center text-white">Menu Table</h1>
                <div className="overflow-x-auto border" style={{ maxHeight: '550px', overflowY: 'auto' }}>
                    <table className="table-auto w-full border-collapse border border-gray-700 text-white">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="border border-gray-700 px-4 py-2">#Ref</th>
                                <th className="border border-gray-700 px-4 py-2">Title</th>
                                <th className="border border-gray-700 px-4 py-2">Image Link</th>
                                <th className="border border-gray-700 px-4 py-2">Price</th>
                                <th className="border border-gray-700 px-4 py-2">Update</th>
                            </tr>
                        </thead>
                        <tbody>

                            <TableRow reference={"Burger1"} id={"676a74154017c510ef92a87c"} />
                            <TableRow reference={"Burger2"} id={"676a86604017c510ef92a87d"} />
                            <TableRow reference={"Burger3"} id={"676bdc411df94b199c77d61c"} />
                            <TableRow reference={"Burger4"} id={"676bdc6c1df94b199c77d61d"} />

                            <TableRow reference={"Dessert1"} id={"676cc0f70a8619ecb2a2c9ea"} />
                            <TableRow reference={"Dessert2"} id={"676cc1000a8619ecb2a2c9eb"} />
                            <TableRow reference={"Dessert3"} id={"676cc1070a8619ecb2a2c9ec"} />
                            <TableRow reference={"Dessert4"} id={"676cc10d0a8619ecb2a2c9ed"} />

                            <TableRow reference={"Pizza1"} id={"676cc0120a8619ecb2a2c9e4"} />
                            <TableRow reference={"Pizza2"} id={"676cc0560a8619ecb2a2c9e5"} />
                            <TableRow reference={"Pizza3"} id={"676cc08e0a8619ecb2a2c9e7"} />
                            <TableRow reference={"Pizza4"} id={"676cc0c10a8619ecb2a2c9e9"} />

                            <TableRow reference={"Cold_drink1"} id={"676cc11c0a8619ecb2a2c9ee"} />
                            <TableRow reference={"Cold_drink2"} id={"676cc1280a8619ecb2a2c9ef"} />
                            <TableRow reference={"Cold_drink3"} id={"676cc1310a8619ecb2a2c9f0"} />
                            <TableRow reference={"Cold_drink4"} id={"676cc1390a8619ecb2a2c9f1"} />

                            <TableRow reference={"Special_Combo1"} id={"676cc1400a8619ecb2a2c9f2"} />
                            <TableRow reference={"Special_Combo2"} id={"676cc1470a8619ecb2a2c9f3"} />
                            <TableRow reference={"Special_Combo3"} id={"676cc14f0a8619ecb2a2c9f4"} />
                            <TableRow reference={"Special_Combo4"} id={"676cc1580a8619ecb2a2c9f5"} />

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

}

export default Menu;
