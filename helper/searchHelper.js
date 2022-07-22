// var G = require('generatorics')

var projectHelper = function (fields, type) {
  let projectArr = {}
  fields.forEach((element) => {
    projectArr[element] = type
  })
  return { $project: projectArr }
}

var searchHelper = function (searchFiled, fields) {
  let orArr = []
  fields.forEach((element) => {
    orArr.push({ [element]: { $regex: new RegExp(searchFiled, 'i') } })
  })

  // // Any Search Start
  // // let filtered = searchFiled.split("").filter(function (el) { return el !== ' ' && el })
  // let filtered = searchFiled.split("")
  // let arrPerm = []

  // for (var perm of G.permutation(filtered)) {
  //   arrPerm.push(perm.join(""))
  // }

  // for (var perm of G.permutation(filtered.reverse())) {
  //   arrPerm.push(perm.join(""))
  // }

  // let unique = [...new Set(arrPerm)]

  // unique.forEach((txt) => {
  //   fields.forEach((element) => {
  //     orArr.push({ [element]: { $regex: new RegExp(txt, 'i') } })
  //   })
  // })
  // // Any Search End

  return { $match: { $or: orArr } }
}

var facetHelper = function (skip, limit) {
  return {
    $facet: {
      list: [
        {
          $skip: Number(skip) < 0 ? 0 : Number(skip) || 0,
        },
        {
          $limit: Number(limit) < 0 ? 10 : Number(limit) || 10,
        },
      ],
      totalRecords: [
        {
          $count: 'count',
        },
      ],
    },
  }
}

var sortHelper = function (columnName, orderBy) {
  return {
    $sort: { [columnName ? columnName : 'createdAt']: orderBy === 'asc' ? 1 : -1 },
  }
}

var lookupHelper = function (from, localField, foreignField, as) {
  return {
    $lookup: {
      from: from,
      localField: localField,
      foreignField: foreignField,
      as: as,
    },
  }
}

var unwindHelper = function (path) {
  return {
    $unwind: {
      path: path,
      preserveNullAndEmptyArrays: true
    }
  }
}

var responseHelper = function (data) {
 // console.log("responsehelper === ",data[0].list)
  const isData = data === undefined || data[0] === undefined || data[0].list === undefined || data[0].list.length === 0
  var response = {}
  response.message = 'success'
  response.status = 200
  response.data = {
    list: isData ? [] : data[0].list,
    totalRecords: isData ? { count: 0 } : data[0].totalRecords[0],
  }
  return response
}
var filterHelper = function (searchFiled, fields) {
  let orArr = []
  fields.forEach((element) => {
    orArr.push({ [element]: { $regex: new RegExp(searchFiled, 'i') } })
  })

  return { $match: { $or: orArr } }
}

module.exports = {
  searchHelper: searchHelper,
  facetHelper: facetHelper,
  sortHelper: sortHelper,
  responseHelper: responseHelper,
  projectHelper: projectHelper,
  lookupHelper: lookupHelper,
  unwindHelper: unwindHelper,
  filterHelper:filterHelper
}
