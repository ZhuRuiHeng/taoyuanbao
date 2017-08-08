/**
 * ------------------------------------------------------------ 
 * 日期类函数
 * @date 2016-04-17
 * @author Allen<allenlinc@gmail.com>
 * 获取当前时间两种格式  system.date.GetCurrentDate   system.date.GetCurrentTime
 * ------------------------------------------------------------
*/
system.date = {}; //日期函数

// 取得当前日期,格式yyyy-mm-dd 
system.date.GetCurrentDate = function() {
    var CurrentDate = new Date ();
    return this.ChangeDateToString ( CurrentDate );
}

//获得当前日期，格式yyyy-mm-dd hh:mm
system.date.GetCurrentTime = function() {
	var CurrentDate = new Date();
	return this.ChangeTimeToString(CurrentDate);
}

// 将日期类型转换成字符串型格式yyyy-MM-dd 
system.date.ChangeDateToString = function(DateIn) {
	var Year = 0;
	var Month = 0;
	var Day = 0;
	var CurrentDate = "";
	//初始化时间 
	Year = DateIn.getFullYear();
	Month = DateIn.getMonth() + 1;
	Day = DateIn.getDate();
	CurrentDate = Year + "-";
	if (Month >= 10) {
		CurrentDate = CurrentDate + Month + "-";
	} else {
		CurrentDate = CurrentDate + "0" + Month + "-";
	}
	if (Day >= 10) {
		CurrentDate = CurrentDate + Day;
	} else {
		CurrentDate = CurrentDate + "0" + Day;
	}
	return CurrentDate;
}

// 将日期类型转换成字符串型格式yyyy-MM-dd hh:mm 
system.date.ChangeTimeToString = function(DateIn) {
	var Year = 0;
	var Month = 0;
	var Day = 0;
	var Hour = 0;
	var Minute = 0;
	var CurrentDate = "";
	//初始化时间 
	Year = DateIn.getFullYear();
	Month = DateIn.getMonth() + 1;
	Day = DateIn.getDate();
	Hour = DateIn.getHours();
	Minute = DateIn.getMinutes();

	CurrentDate = Year + "-";
	if (Month >= 10) {
		CurrentDate = CurrentDate + Month + "-";
	} else {
		CurrentDate = CurrentDate + "0" + Month + "-";
	}
	if (Day >= 10) {
		CurrentDate = CurrentDate + Day;
	} else {
		CurrentDate = CurrentDate + "0" + Day;
	}
	if (Hour >= 10) {
		CurrentDate = CurrentDate + " " + Hour;
	} else {
		CurrentDate = CurrentDate + " 0" + Hour;
	}
	if (Minute >= 10) {
		CurrentDate = CurrentDate + ":" + Minute;
	} else {
		CurrentDate = CurrentDate + ":0" + Minute;
	}
	return CurrentDate;
}
