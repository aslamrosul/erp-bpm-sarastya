import 'package:intl/intl.dart';

extension DateExtensions on DateTime {
  String toFormattedString() {
    return DateFormat('dd MMM yyyy').format(this);
  }

  String toFormattedDateTime() {
    return DateFormat('dd MMM yyyy HH:mm').format(this);
  }

  bool isSameDay(DateTime other) {
    return year == other.year && month == other.month && day == other.day;
  }

  bool isToday() {
    final now = DateTime.now();
    return isSameDay(now);
  }

  bool isYesterday() {
    final yesterday = DateTime.now().subtract(const Duration(days: 1));
    return isSameDay(yesterday);
  }
}
