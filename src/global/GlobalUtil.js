import React, { Component } from "react";
export const getCurrentMonth = () => {
  let date = new Date();
  let month = parseInt(date.getMonth()) + 1;

  if (month < 10) {
    return "0" + month;
  } else {
    return month;
  }
};

export const getCurrentYear = () => {
  let date = new Date();
  return date.getFullYear();
};

export const amountDisplayConverter = (amount) => {
  // Convert amount to display format
  let type = amount.toString().includes("-") ? "- " : "";
  let newAmount = amount.toString().replace("-", "");

  return (
    type +
    "RM " +
    parseFloat(newAmount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
  );
};

export const amountToFixed2 = (amount) => {
  // Convert amount to display format
  return parseFloat(amount).toFixed(2);
};

export const getDayOfWeek = (date) => {
  // Get day of the week
  let newDate = new Date(date);
  let day = newDate.getDay();

  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Satuday";
    default:
      return "";
  }
};

export const getLayoutDatalist = (list) => {
  // Create datalist for Form.Control
  // Note: should add switch case if special handling required
  return list.map((value, index) => (
    <option key={index} value={value.name}></option>
  ));
};

export const getTodayDate = () => {
  var date = new Date();
  var month =
    (date.getMonth() + 1).toString().length === 1
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var day =
    date.getDate().toString().length === 1
      ? "0" + date.getDate()
      : date.getDate();

  var todayDate = date.getFullYear() + "-" + month + "-" + day;
  console.log("todayDate: " + todayDate);
  return todayDate;
};

export const isEmpty = (value) => {
  if ((value !== undefined || value != null) && value != "") {
    return false;
  } else {
    return true;
  }
};

export const getYearList = () => {
  let yearList = [];
  let endYear = getCurrentYear();

  for (let i = endYear; i >= 2020; i--) {
    yearList.push({ name: i });
  }
  return yearList;
};

export const getIndexByName = (list, name) => {
  for (let value of list) {
    if (value.name === name) {
      console.log("getIndexByName: " + name + " index: " + value.id);
      return value.id;
    }
  }

  return 0;
};

export const getNameByIndex = (list, index) => {
  for (let value of list) {
    if (value.id === index) {
      console.log("getNameByIndex: " + index + " name: " + value.name);
      return value.name;
    }
  }

  return "";
};
