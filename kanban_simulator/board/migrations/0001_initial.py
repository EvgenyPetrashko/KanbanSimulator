# Generated by Django 3.1.3 on 2021-06-19 13:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ready', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('version', models.IntegerField(default=0)),
                ('dayNum', models.IntegerField(default=1)),
                ('wip_limit1', models.IntegerField(blank=True, null=True)),
                ('wip_limit2', models.IntegerField(blank=True, null=True)),
                ('wip_limit3', models.IntegerField(blank=True, null=True)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='board.room')),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creator', models.BooleanField(default=False)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='board.team')),
            ],
        ),
        migrations.CreateModel(
            name='Day',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.IntegerField()),
                ('anl_completed_tasks', models.IntegerField()),
                ('dev_completed_tasks', models.IntegerField()),
                ('test_completed_tasks', models.IntegerField()),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='board.team')),
            ],
        ),
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.IntegerField(default=0)),
                ('card_id', models.IntegerField(default=-1)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='board.team')),
            ],
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.IntegerField(default=0)),
                ('is_expedite', models.BooleanField(default=False)),
                ('ready_day', models.IntegerField(default=15)),
                ('analytic_remaining', models.IntegerField()),
                ('analytic_completed', models.IntegerField(default=0)),
                ('develop_remaining', models.IntegerField()),
                ('develop_completed', models.IntegerField(default=0)),
                ('test_remaining', models.IntegerField()),
                ('test_completed', models.IntegerField(default=0)),
                ('column_number', models.IntegerField(default=0)),
                ('row_number', models.IntegerField(default=0)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='board.team')),
            ],
        ),
    ]
