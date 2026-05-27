import 'package:flutter/material.dart';
import '../../../../core/di/injection_container.dart' as di;
import '../../data/datasources/employee_remote_datasource.dart';
import '../../domain/entities/employee.dart';

class EmployeeFormPage extends StatefulWidget {
  final Employee? employee;

  const EmployeeFormPage({super.key, this.employee});

  @override
  State<EmployeeFormPage> createState() => _EmployeeFormPageState();
}

class _EmployeeFormPageState extends State<EmployeeFormPage> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _firstNameController;
  late TextEditingController _lastNameController;
  late TextEditingController _emailController;
  late TextEditingController _phoneController;
  late TextEditingController _salaryController;
  
  String _status = 'active';
  bool _isLoading = false;
  late EmployeeRemoteDataSource _dataSource;

  @override
  void initState() {
    super.initState();
    _dataSource = di.sl<EmployeeRemoteDataSource>();
    _firstNameController = TextEditingController(text: widget.employee?.firstName ?? '');
    _lastNameController = TextEditingController(text: widget.employee?.lastName ?? '');
    _emailController = TextEditingController(text: widget.employee?.email ?? '');
    _phoneController = TextEditingController(text: widget.employee?.phoneNumber ?? '');
    _salaryController = TextEditingController(text: widget.employee?.salary?.toString() ?? '');
    _status = widget.employee?.status ?? 'active';
  }

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _salaryController.dispose();
    super.dispose();
  }

  Future<void> _saveEmployee() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      final data = {
        'employeeNumber': 'EMP${DateTime.now().millisecondsSinceEpoch}',
        'firstName': _firstNameController.text,
        'lastName': _lastNameController.text,
        'email': _emailController.text,
        'phone': _phoneController.text,
        'salary': double.tryParse(_salaryController.text) ?? 0,
        'status': _status,
        'dateOfBirth': DateTime.now().subtract(const Duration(days: 365 * 25)).toIso8601String(),
        'hireDate': DateTime.now().toIso8601String(),
        // Use default IT department and developer position from seeded data
        'departmentId': 'f6c507bb-3bd8-415b-8eef-27c8a12b56a9', // IT Department
        'positionId': '08bd5006-3264-4a60-88a3-4dcf8e799977', // Software Developer
        'address': '',
        'city': 'Jakarta',
        'country': 'Indonesia',
        'emergencyContact': '', // Add missing fields
        'emergencyPhone': '', // Add missing fields
      };

      if (widget.employee != null) {
        await _dataSource.updateEmployee(widget.employee!.id, data);
      } else {
        await _dataSource.createEmployee(data);
      }

      if (mounted) {
        Navigator.pop(context, true);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Employee ${widget.employee != null ? 'updated' : 'created'} successfully')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${e.toString()}')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.employee != null ? 'Edit Employee' : 'Add Employee'),
        backgroundColor: const Color(0xFF7B2D8B),
        foregroundColor: Colors.white,
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            TextFormField(
              controller: _firstNameController,
              decoration: const InputDecoration(
                labelText: 'First Name',
                border: OutlineInputBorder(),
              ),
              validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _lastNameController,
              decoration: const InputDecoration(
                labelText: 'Last Name',
                border: OutlineInputBorder(),
              ),
              validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _emailController,
              decoration: const InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.emailAddress,
              validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _phoneController,
              decoration: const InputDecoration(
                labelText: 'Phone',
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.phone,
              validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _salaryController,
              decoration: const InputDecoration(
                labelText: 'Salary',
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              initialValue: _status,
              decoration: const InputDecoration(
                labelText: 'Status',
                border: OutlineInputBorder(),
              ),
              items: const [
                DropdownMenuItem(value: 'active', child: Text('Active')),
                DropdownMenuItem(value: 'inactive', child: Text('Inactive')),
              ],
              onChanged: (value) => setState(() => _status = value!),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: _isLoading ? null : _saveEmployee,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF7B2D8B),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
              child: _isLoading
                  ? const CircularProgressIndicator(color: Colors.white)
                  : Text(widget.employee != null ? 'Update' : 'Create'),
            ),
          ],
        ),
      ),
    );
  }
}
