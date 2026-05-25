import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../core/di/injection_container.dart' as di;
import '../bloc/employee_bloc.dart';
import '../bloc/employee_event.dart';
import '../bloc/employee_state.dart';
import 'employee_detail_page.dart';
import 'employee_form_page.dart';

class EmployeesPage extends StatelessWidget {
  const EmployeesPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => di.sl<EmployeeBloc>()..add(LoadEmployees()),
      child: const EmployeesView(),
    );
  }
}

class EmployeesView extends StatefulWidget {
  const EmployeesView({Key? key}) : super(key: key);

  @override
  State<EmployeesView> createState() => _EmployeesViewState();
}

class _EmployeesViewState extends State<EmployeesView> {
  String _searchQuery = '';
  String _filterStatus = 'all';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Employees'),
        backgroundColor: const Color(0xFF7B2D8B),
        foregroundColor: Colors.white,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final result = await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const EmployeeFormPage(),
            ),
          );
          if (result == true && context.mounted) {
            context.read<EmployeeBloc>().add(LoadEmployees());
          }
        },
        backgroundColor: const Color(0xFF7B2D8B),
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                TextField(
                  decoration: InputDecoration(
                    hintText: 'Search employees...',
                    prefixIcon: const Icon(Icons.search),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  onChanged: (value) {
                    setState(() => _searchQuery = value.toLowerCase());
                  },
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    const Text('Status: '),
                    const SizedBox(width: 8),
                    Expanded(
                      child: SegmentedButton<String>(
                        segments: const [
                          ButtonSegment(value: 'all', label: Text('All')),
                          ButtonSegment(value: 'active', label: Text('Active')),
                          ButtonSegment(
                              value: 'inactive', label: Text('Inactive')),
                        ],
                        selected: {_filterStatus},
                        onSelectionChanged: (Set<String> newSelection) {
                          setState(() => _filterStatus = newSelection.first);
                        },
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Expanded(
            child: BlocBuilder<EmployeeBloc, EmployeeState>(
              builder: (context, state) {
                if (state is EmployeeLoading) {
                  return const Center(child: CircularProgressIndicator());
                } else if (state is EmployeeError) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.error_outline,
                            size: 64, color: Colors.red),
                        const SizedBox(height: 16),
                        Text(state.message),
                        const SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: () {
                            context.read<EmployeeBloc>().add(LoadEmployees());
                          },
                          child: const Text('Retry'),
                        ),
                      ],
                    ),
                  );
                } else if (state is EmployeeLoaded) {
                  final filteredEmployees = state.employees.where((emp) {
                    final matchesSearch = '${emp.firstName} ${emp.lastName}'
                        .toLowerCase()
                        .contains(_searchQuery);
                    final matchesStatus = _filterStatus == 'all' ||
                        emp.status.toLowerCase() == _filterStatus;
                    return matchesSearch && matchesStatus;
                  }).toList();

                  if (filteredEmployees.isEmpty) {
                    return const Center(child: Text('No employees found'));
                  }

                  return RefreshIndicator(
                    onRefresh: () async {
                      context.read<EmployeeBloc>().add(LoadEmployees());
                    },
                    child: ListView.builder(
                      padding: const EdgeInsets.all(16),
                      itemCount: filteredEmployees.length,
                      itemBuilder: (context, index) {
                        final employee = filteredEmployees[index];
                        return Card(
                          margin: const EdgeInsets.only(bottom: 12),
                          child: ListTile(
                            leading: CircleAvatar(
                              backgroundColor: const Color(0xFF7B2D8B),
                              child: Text(
                                employee.firstName[0].toUpperCase(),
                                style: const TextStyle(color: Colors.white),
                              ),
                            ),
                            title: Text(
                              '${employee.firstName} ${employee.lastName}',
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold),
                            ),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(employee.email),
                                Text(
                                  '${employee.positionName} - ${employee.departmentName}',
                                  style: TextStyle(
                                    color: Colors.grey[600],
                                    fontSize: 12,
                                  ),
                                ),
                              ],
                            ),
                            trailing: Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 4,
                              ),
                              decoration: BoxDecoration(
                                color: employee.status.toLowerCase() == 'active'
                                    ? Colors.green.withOpacity(0.1)
                                    : Colors.red.withOpacity(0.1),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Text(
                                employee.status,
                                style: TextStyle(
                                  color:
                                      employee.status.toLowerCase() == 'active'
                                          ? Colors.green
                                          : Colors.red,
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            isThreeLine: true,
                            onTap: () async {
                              final result = await Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => EmployeeDetailPage(
                                    employee: employee,
                                  ),
                                ),
                              );
                              if (result == true && context.mounted) {
                                context.read<EmployeeBloc>().add(LoadEmployees());
                              }
                            },
                          ),
                        );
                      },
                    ),
                  );
                }
                return const Center(child: Text('No data'));
              },
            ),
          ),
        ],
      ),
    );
  }
}
