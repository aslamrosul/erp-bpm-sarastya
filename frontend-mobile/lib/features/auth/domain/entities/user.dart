import 'package:equatable/equatable.dart';

class User extends Equatable {
  final String id;
  final String username;
  final String email;
  final String firstName;
  final String lastName;
  final bool isActive;

  const User({
    required this.id,
    required this.username,
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.isActive,
  });

  String get fullName => '$firstName $lastName';

  @override
  List<Object?> get props => [id, username, email, firstName, lastName, isActive];
}
