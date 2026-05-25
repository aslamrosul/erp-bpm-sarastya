import 'package:flutter/material.dart';

class WorkflowPage extends StatelessWidget {
  const WorkflowPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Workflow'),
      ),
      body: const Center(
        child: Text('Workflow Page'),
      ),
    );
  }
}
