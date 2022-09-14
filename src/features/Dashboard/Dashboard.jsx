import React, { useState, useEffect, useMemo } from 'react';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    BarChart,
    Bar,
} from 'recharts';
import { useDispatch, useSelector } from "react-redux"
import { fetchArticles } from '../../store/articleSlice';
import "./Dashboard.css"

const artdata = [
    {
    "slug": "title8-81135",
    "title": "title8",
    "description": "desc8",
    "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "tagList": [
        "tag1",
        "tag5"
    ],
    "createdAt": "2022-09-01T15:51:16.278Z",
    "updatedAt": "2022-09-01T16:13:19.212Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
        "username": "ferhat",
        "bio": "ornekBio1",
        "image": "https://images.unsplash.com/photo-1660196663783-9fe74d092230?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "following": false
    }
},
{
    "slug": "title7-81135",
    "title": "title7",
    "description": "desc7",
    "body": "body7 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as",
    "tagList": [
        "codebaseShow",
        "tag1",
        "tag3"
    ],
    "createdAt": "2022-09-01T15:49:32.173Z",
    "updatedAt": "2022-09-01T16:20:01.803Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
        "username": "ferhat",
        "bio": "ornekBio1",
        "image": "https://images.unsplash.com/photo-1660196663783-9fe74d092230?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "following": false
    }
},
{
    "slug": "title6-81135",
    "title": "title6",
    "description": "desc6",
    "body": "body6 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that",
    "tagList": [
        "codebaseShow",
        "implementations",
        "tag3",
        "tag5"
    ],
    "createdAt": "2022-08-31T17:09:31.835Z",
    "updatedAt": "2022-09-01T16:19:45.442Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
        "username": "ferhat",
        "bio": "ornekBio1",
        "image": "https://images.unsplash.com/photo-1660196663783-9fe74d092230?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "following": false
    }
},
{
    "slug": "title5-81135",
    "title": "title5",
    "description": "desc5",
    "body": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
    "tagList": [
        "tag1",
        "tag3"
    ],
    "createdAt": "2022-08-31T16:23:48.591Z",
    "updatedAt": "2022-09-01T16:18:19.431Z",
    "favorited": true,
    "favoritesCount": 1,
    "author": {
        "username": "ferhat",
        "bio": "ornekBio1",
        "image": "https://images.unsplash.com/photo-1660196663783-9fe74d092230?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "following": false
    }
},
{
    "slug": "title4-81135",
    "title": "title4",
    "description": "desc4",
    "body": "body4 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    "tagList": [
        "tag2",
        "tag5"
    ],
    "createdAt": "2022-08-31T07:36:14.844Z",
    "updatedAt": "2022-09-01T16:19:29.287Z",
    "favorited": true,
    "favoritesCount": 1,
    "author": {
        "username": "ferhat",
        "bio": "ornekBio1",
        "image": "https://images.unsplash.com/photo-1660196663783-9fe74d092230?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "following": false
    }
},
{
    "slug": "title3-81135",
    "title": "title3",
    "description": "desc3",
    "body": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or",
    "tagList": [
        "tag1",
        "tag3"
    ],
    "createdAt": "2022-08-31T07:35:17.665Z",
    "updatedAt": "2022-09-01T16:17:52.444Z",
    "favorited": true,
    "favoritesCount": 1,
    "author": {
        "username": "ferhat",
        "bio": "ornekBio1",
        "image": "https://images.unsplash.com/photo-1660196663783-9fe74d092230?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "following": false
    }
},
{
    "slug": "title2-81135",
    "title": "title2",
    "description": "desc2",
    "body": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using",
    "tagList": [
        "tag1",
        "tag2"
    ],
    "createdAt": "2022-08-26T07:54:40.755Z",
    "updatedAt": "2022-09-01T16:17:32.079Z",
    "favorited": true,
    "favoritesCount": 1,
    "author": {
        "username": "ferhat",
        "bio": "ornekBio1",
        "image": "https://images.unsplash.com/photo-1660196663783-9fe74d092230?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "following": false
    }
},
{
    "slug": "title1-81135",
    "title": "title1",
    "description": "desc1",
    "body": "body1 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to usingIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed",
    "tagList": [
        "tag1",
        "tag2"
    ],
    "createdAt": "2022-08-23T08:19:11.110Z",
    "updatedAt": "2022-09-01T16:19:05.444Z",
    "favorited": true,
    "favoritesCount": 1,
    "author": {
        "username": "ferhat",
        "bio": "ornekBio1",
        "image": "https://images.unsplash.com/photo-1660196663783-9fe74d092230?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "following": false
    }
},
{
    "slug": "Create-a-new-implementation-1",
    "title": "Create a new implementation",
    "description": "join the community by creating a new implementation",
    "body": "Share your knowledge and enpower the community by creating a new implementation",
    "tagList": [
        "implementations"
    ],
    "createdAt": "2021-11-24T12:11:08.212Z",
    "updatedAt": "2021-11-24T12:11:08.212Z",
    "favorited": true,
    "favoritesCount": 3739,
    "author": {
        "username": "Gerome",
        "bio": null,
        "image": "https://api.realworld.io/images/demo-avatar.png",
        "following": true
    }
},
{
    "slug": "Explore-implementations-1",
    "title": "Explore implementations",
    "description": "discover the implementations created by the RealWorld community",
    "body": "Over 100 implementations have been created using various languages, libraries, and frameworks.\n\nExplore them on CodebaseShow.",
    "tagList": [
        "codebaseShow",
        "implementations"
    ],
    "createdAt": "2021-11-24T12:11:07.952Z",
    "updatedAt": "2021-11-24T12:11:07.952Z",
    "favorited": true,
    "favoritesCount": 2176,
    "author": {
        "username": "Gerome",
        "bio": null,
        "image": "https://api.realworld.io/images/demo-avatar.png",
        "following": true
    }
}
]

const Dashboard = () => {
    const dispatch = useDispatch();

    const { theme } = useSelector(state => state.theme)
    const authInfo = useSelector(state => state.auth)
    const { articles } = useSelector(state => state.article)

    const [areaChartData, setAreaChartData] = useState([])
    const [radarChartData, setRadarChartData] = useState([])
    const [barChartData, setBarChartData] = useState([])
    const [loading, setLoading] = useState(false);
    const [chartColor, setChartColor] = useState("#1a1a1a")
    const [count ,setCount] = useState(1)
    const [countS ,setCountS] = useState(1)


    const fillAreaChartData = ()=>{
        let areaData = []
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].author.username == authInfo.currentUser.username) {
                const date = new Date(articles[i].createdAt);
                const createAtStr = date.toDateString().substring(4, 7) + " " + date.toDateString().substring(8, 10)
                if (areaData.length == 0) {
                    areaData.unshift({ date: createAtStr, count: 1 })
                } else {
                    let isContain = false;
                    for (let j = 0; j < areaData.length; j++) {
                        if (areaData[j].date == createAtStr) {
                            areaData[j].count = areaData[j].count + 1;
                            isContain = true;
                        }
                    }
                    if (isContain == false) {
                        areaData.unshift({ date: createAtStr, count: 1 })
                    }
                }
            }
        }
        return areaData;
    }
    const fillRadarChartData = () => {
        const radarDatas = [];
        for (let i = 0; i < articles.length; i++) {
            const tagList = articles[i].tagList;
            //empty control
            if (radarDatas.length == 0) {
                radarDatas.push({ tag: tagList[0], count: 1 })
            }
            for (let j = 0; j < tagList.length; j++) {
                let isContain = false;
                for (let k = 0; k < radarDatas.length; k++) {
                    if (tagList[j] == radarDatas[k].tag) {
                        radarDatas[k].count++
                        isContain = true;
                    }
                }
                if (isContain == false) {
                    radarDatas.unshift({ tag: tagList[j], count: 1 })
                }
            }
        }
        const mostPopularSixTag = radarDatas.filter((item, index) => index >= radarDatas.length - 6)
        return mostPopularSixTag;
    }
    const fillBarChartData = () => {
        let barData = [];
        articles.forEach((item) => {
            if (item.author.username == authInfo.currentUser.username) {
                const wordList = item.body.split(" ");
                barData.unshift({
                    title: item.title,
                    "Word Count": wordList.length
                })
            }
        });
        return barData;
    }

    const fetchCharData = async () => {
        await dispatch(fetchArticles(authInfo.currentUser.token));
        setAreaChartData(memoAreaCharData)
        setRadarChartData(memoRadarChartData)
        setBarChartData(memoBarCharData)
        setLoading(true);
    }


    const memoAreaCharData = useMemo(()=>{
        return fillAreaChartData();
    },[articles])
    const memoRadarChartData = useMemo(()=>{
        return fillRadarChartData();
    },[articles])
    const memoBarCharData = useMemo(()=>{
        return fillBarChartData();
    },[articles])


    useEffect(() => {
        fetchCharData()
    }, [])

    useEffect(() => {
        (theme == "light") ? setChartColor("#1a1a1a") : setChartColor("lightgray");
    }, [theme])


    return (
        <div className="container dashboard">
            <h1>Dashboard</h1>
            <div className="flex-row">
                {!loading && <h2 style={{ color: "var(--text)", textAlign: "center" }}>Loading...</h2>}
                {loading && <>
                    <div className='area-chart flex-row col-12'>
                        <div className="head col-12">
                            <h4>ARTICLE COUNT</h4>
                        </div>
                        <div className="body col-12">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={areaChartData}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid stroke={chartColor} opacity="0.3" strokeDasharray="3 3" />
                                    <XAxis opacity={0.8} stroke={chartColor} dataKey="date" />
                                    <YAxis opacity={0.8} stroke={chartColor} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="count" stroke={chartColor} fill="#55a555" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className=' flex-row col-6'>
                        <div className="radar-chart flex-row">
                            <div className="head col-12">
                                <h4>TAGS BY ARTİCLES</h4>
                            </div>
                            <div className="body col-12">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                                        <PolarGrid fill={chartColor} />
                                        <PolarAngleAxis opacity={0.8} stroke={chartColor} dataKey="tag" />
                                        <PolarRadiusAxis stroke={chartColor} />
                                        <Radar name="Mike" dataKey="count" stroke="#55a555" fill="#55a555" fillOpacity={0.6} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className=' flex-row col-6'>
                        <div className="bar-chart flex-row">
                            <div className="head col-12">
                                <h4>WORD COUNT BY ARTİCLES</h4>
                            </div>
                            <div className="body col-12">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart width={150} height={40} data={barChartData}>
                                        <XAxis opacity={0.8} stroke={chartColor} dataKey="title" />
                                        <YAxis opacity={0.8} stroke={chartColor} />
                                        <Tooltip />
                                        <Bar opacity="0.7" dataKey="Word Count" fill="#55a555" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default Dashboard