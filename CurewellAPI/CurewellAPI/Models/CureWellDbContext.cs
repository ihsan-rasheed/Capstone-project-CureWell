using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using CurewellAPI.Models;

namespace CurewellAPI.Models;

public partial class CureWellDbContext : DbContext
{
    public CureWellDbContext()
    {
    }

    public CureWellDbContext(DbContextOptions<CureWellDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Doctor> Doctors { get; set; }

    public virtual DbSet<DoctorSpecialization> DoctorSpecializations { get; set; }

    public virtual DbSet<Specialization> Specializations { get; set; }

    public virtual DbSet<Surgery> Surgeries { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=INL566;Database=CureWell;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Doctor>(entity =>
        {
            entity.HasKey(e => e.DoctorId).HasName("PK__Doctor__2DC00EDFF3462393");
        });

        modelBuilder.Entity<DoctorSpecialization>(entity =>
        {
            entity.HasKey(e => new { e.DoctorId, e.SpecializationCode }).HasName("PK__DoctorSp__D3EF422B3DA72965");

            entity.Property(e => e.SpecializationCode).IsFixedLength();

            entity.HasOne(d => d.Doctor).WithMany(p => p.DoctorSpecializations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DoctorSpe__Docto__300424B4");

            entity.HasOne(d => d.SpecializationCodeNavigation).WithMany(p => p.DoctorSpecializations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DoctorSpe__Speci__30F848ED");
        });

        modelBuilder.Entity<Specialization>(entity =>
        {
            entity.HasKey(e => e.SpecializationCode).HasName("PK__Speciali__E2F4CF4EC0CCF1F5");

            entity.Property(e => e.SpecializationCode).IsFixedLength();
        });

        modelBuilder.Entity<Surgery>(entity =>
        {
            entity.HasKey(e => e.SurgeryId).HasName("PK__Surgery__08AD55DDF257474B");

            entity.Property(e => e.SurgeryCategory).IsFixedLength();

            entity.HasOne(d => d.Doctor).WithMany(p => p.Surgeries).HasConstraintName("FK__Surgery__DoctorI__286302EC");

            entity.HasOne(d => d.SurgeryCategoryNavigation).WithMany(p => p.Surgeries).HasConstraintName("FK__Surgery__Surgery__29572725");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    public DbSet<CurewellAPI.Models.Admin>? Admin { get; set; }
}
